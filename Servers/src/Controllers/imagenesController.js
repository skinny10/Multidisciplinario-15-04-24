import mongoose from "mongoose";
import * as fs from 'fs';

// Definición del esquema
const esquema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  texto: String,
  fecha: Date,
  facebook: String,
  whatsapp: String,
  instagram: String
}, { versionKey: false });

// Creación del modelo
const ImagenesModel = mongoose.model('imagenes', esquema);

// Función para obtener imágenes
export const getImagenes = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = (id === undefined) ? await ImagenesModel.find() : await ImagenesModel.findById(id);
    return res.status(200).json({ status: true, data: rows });
  } catch (error) {
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función para guardar imágenes
export const saveImagenes = async (req, res) => {
  try {
    const { nombre, fecha, texto, facebook, whatsapp, instagram } = req.body;
    const validacion = validar(nombre, texto, fecha, req.file, 'Y');
    if (validacion.length === 0) {
      const nuevaImagen = new ImagenesModel({
        nombre: nombre,
        texto: texto,
        fecha: fecha,
        imagen: '/uploads/' + req.file.filename,
        facebook: facebook,
        whatsapp: whatsapp,
        instagram: instagram
      });
      await nuevaImagen.save();
      return res.status(200).json({ status: true, message: 'Imagen guardada' });
    } else {
      return res.status(400).json({ status: false, errors: validacion });
    }
  } catch (error) {
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función para actualizar imágenes
export const updateImagenes = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, fecha, texto, facebook, whatsapp, instagram } = req.body;
    let imagen = '';
    let valores = { nombre: nombre, texto: texto, fecha: fecha, facebook: facebook, whatsapp: whatsapp, instagram: instagram };
    if (req.file != null) {
      imagen = '/uploads/' + req.file.filename;
      valores = { nombre: nombre, texto: texto, fecha: fecha, imagen: imagen, facebook: facebook, whatsapp: whatsapp, instagram: instagram };
    }
    const validacion = validar(nombre, texto, fecha);
    if (validacion.length === 0) {
      await ImagenesModel.updateOne({ _id: id }, { $set: valores });
      return res.status(200).json({ status: true, message: ' imagen actualizada' });
    } else {
      return res.status(400).json({ status: false, errors: validacion });
    }
  } catch (error) {
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

export const deleteImagen = async (req, res) => {
  try {
    const { id } = req.params;
    await ImagenesModel.deleteOne({ _id: id });
    return res.status(200).json({ status: true, message: 'imagen eliminada' });
  } catch (error) {
    return res.status(500).json({ status: false, errors: [error.message] });
  }
};

// Función de validación
const validar = (nombre, texto, fecha, img, seValida) => {
  var errors = [];
  if (nombre === undefined || nombre.trim() === '') {
    errors.push('El nombre no debe estar vacio');
  }
  if (texto === undefined || texto.trim() === '') {
    errors.push('El texto no debe estar vacio');
  }
  if (fecha === undefined || fecha.trim() === '' || isNaN(Date.parse(fecha))) {
    errors.push('La fecha no debe estar vacía y debe ser válida');
  }
  if (seValida === 'Y' && (img === undefined || !(img.mimetype === 'image/jpeg' || img.mimetype === 'image/png'))) {
    errors.push('Selecciona un archivo en formato jpg o png');
  }

  // Asumiendo que quieres eliminar el archivo solo si hay errores
  if (errors.length > 0 && img) {
    try {
      fs.unlinkSync('./public/uploads/' + img.filename); // Asegúrate de que la ruta sea correcta
    } catch (error) {
      console.error("Error eliminando el archivo:", error.message);
    }
  }

  return errors;
};