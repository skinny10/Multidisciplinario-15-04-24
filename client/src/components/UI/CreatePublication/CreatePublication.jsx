import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CreatePublication.css';

function CreatePublication() {
  const [nombre, setNombre] = useState('');
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState(null);
  const [facebook, setFacebook] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('texto', texto);
      formData.append('fecha', fecha);
      formData.append('imagen', imagen);
      formData.append('facebook', facebook);
      formData.append('whatsapp', whatsapp);
      formData.append('instagram', instagram);

      await axios.post('http://localhost:5000/api/imagenes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        icon: 'success',
        title: '¡Publicación guardada!',
        showConfirmButton: false,
        timer: 1500
      });

      setNombre('');
      setTexto('');
      setFecha('');
      setImagen(null);
      setFacebook('');
      setWhatsapp('');
      setInstagram('');
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar la publicación',
        text: error.message
      });
    }
  };

  return (
    <div id='publicacion' className="container mx-auto max-w-md mt-8">
      <h1 className="text-3xl font-bold mb-4">Crear Publicación</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Titulo de publicación:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Texto:</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Fecha:</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-bold mb-2">Imagen:</label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setImagen(e.target.files[0])}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4">
  <div className="flex-1 flex items-center">
    <i className="fab fa-facebook-f mr-2"></i>
    <input
      type="text"
      placeholder="URL de Facebook"
      value={facebook}
      onChange={(e) => setFacebook(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="flex-1 flex items-center">
    <i className="fab fa-whatsapp mr-2"></i>
    <input
      type="text"
      placeholder="URL de WhatsApp"
      value={whatsapp}
      onChange={(e) => setWhatsapp(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
  <div className="flex-1 flex items-center">
    <i className="fab fa-instagram mr-2"></i>
    <input
      type="text"
      placeholder="URL de Instagram"
      value={instagram}
      onChange={(e) => setInstagram(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
</div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}

export default CreatePublication;