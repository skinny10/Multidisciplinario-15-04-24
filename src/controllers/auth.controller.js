import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["El correo electronico ya esta en uso!"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

  // Obtener la lista de usuarios
  export const getUsers = async (req, res) => {
    try {
      // Realiza una consulta a la base de datos para obtener la lista de usuarios
      const users = await User.find(); // Suponiendo que tienes un modelo User
  
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la lista de usuarios' });
    }
  };

  
  // Actualizar la información de un usuario
  export const updateUser = async (req, res) => {
    const userId = req.params.id; // Suponiendo que el ID del usuario se pasa como parámetro en la URL
    const updatedUserData = req.body; // Los datos actualizados se esperan en el cuerpo de la solicitud
  
    try {
      // Realiza la actualización en la base de datos utilizando el ID y los datos proporcionados
      const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData);
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  };
  
  
  // Eliminar un usuario
  export const deleteUser = async (req, res) => {
    const userId = req.params.id; // Suponiendo que el ID del usuario se pasa como parámetro en la URL
  
    try {
      // Realiza la eliminación en la base de datos utilizando el ID
      await User.findByIdAndRemove(userId);
  
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario' });
    }
  };
  
  // Obtener información de un usuario específico
  export const getUser = async (req, res) => {
    const userId = req.params.id; // Suponiendo que el ID del usuario se pasa como parámetro en la URL
  
    try {
      // Realiza una consulta a la base de datos para obtener la información del usuario por su ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la información del usuario' });
    }
  };


  
  // Ruta para subir la imagen de perfil
export const uploadProfileImage = async (req, res) => {
  try {
    // Verificar si se ha subido una imagen
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha seleccionado ninguna imagen' });
    }

    // Obtener el usuario autenticado
    const userId = req.user._id; // Asumiendo que tienes middleware de autenticación

    // Actualizar la imagen de perfil del usuario
    const user = await User.findByIdAndUpdate(userId, { profileImage: req.file.path }, { new: true });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen de perfil' });
  }
};
  