//importamos nuestros tipos de usuarios
import Veterinarian from "../models/veterinarian.model.js";
import Client from "../models/client.model.js";
//importamos bcryptjs para encriptar las contraseñas de nuestros usuarios
import bcrypt from "bcryptjs";
//importamos la funcion que crea un token jwt
import { createAccessToken } from "../libs/jwt.js";

// Función para registrarse
export const register = async (req, res) => {
  const { userType, email, password, username } = req.body;

  try {
    // Verificamos el tipo de usuario
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    // Verificar si ya existe un usuario con el mismo email
    const emailExists = await (userType === "veterinarian"
      ? Veterinarian
      : Client
    ).findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese email" });
    }

    // Verificar si ya existe un usuario con el mismo username
    const usernameExists = await (userType === "veterinarian"
      ? Veterinarian
      : Client
    ).findOne({ username });

    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "Ya existe un usuario con ese nombre de usuario" });
    }

    // Ejecutamos bcrypt para encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Creamos el usuario según el tipo
    const newUser =
      userType === "veterinarian"
        ? new Veterinarian({ username, email, password: passwordHash })
        : new Client({ username, email, password: passwordHash });

    // Guardamos en la base de datos
    const userSaved = await newUser.save();

    // Creamos un token
    const token = await createAccessToken({
      id: userSaved._id,
      userType,
    });

    res.status(201).json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } creado exitosamente`,
      token,
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Datos proporcionados inválidos" });
    } else {
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
};

// Función para hacer iniciar sesión
export const login = async (req, res) => {
  const { userType, email, password } = req.body;

  try {
    // Verificamos el tipo de usuario
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    // Buscar al usuario
    const userFound =
      userType === "veterinarian"
        ? await Veterinarian.findOne({ email })
        : await Client.findOne({ email });

    if (!userFound) {
      return res.status(404).json({
        message: `${
          userType.charAt(0).toUpperCase() + userType.slice(1)
        } no encontrado`,
      });
    }

    // Verificamos la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Creamos un token
    const token = await createAccessToken({
      id: userFound._id,
      userType,
    });

    res.status(200).json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } inició sesión correctamente`,
      token,
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const logout = (req, res) => {
  //en el cliente eliminaremos el token y con eso cerramos la sesion
  return res.status(200).json({ message: "Cierre de sesión exitoso" });
};

// Función para el perfil del usuario
export const profile = async (req, res) => {
  const { id, userType } = req.user;

  try {
    // Verificamos el tipo de usuario
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Tipo de usuario inválido" });
    }

    // Buscar usuario
    const user =
      userType === "veterinarian"
        ? await Veterinarian.findById(id)
        : await Client.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Perfil de usuario recuperado exitosamente",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
