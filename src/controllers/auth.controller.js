//importamos nuestros tipos de usuarios
import Veterinarian from "../models/veterinarian.model.js";
import Client from "../models/client.model.js";
//importamos bcryptjs para encriptar las contraseñas de nuestros usuarios
import bcrypt from "bcryptjs";
//importamos la funcion que crea un token jwt
import { createAccessToken } from "../libs/jwt.js";

// Funcion para registrarse
export const register = async (req, res) => {
  // Extraemos los campos del body que nos envían
  const { userType, email, password, username } = req.body;

  try {
    // Ejecutamos bcrypt para encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    let newUser;

    // Verificamos el tipo de usuario
    if (userType === "veterinarian") {
      // Creamos un objeto veterinario
      newUser = new Veterinarian({
        username,
        email,
        password: passwordHash,
      });
    } else if (userType === "client") {
      // Creamos un objeto cliente
      newUser = new Client({
        username,
        email,
        password: passwordHash,
      });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Lo guardamos en la base de datos
    const userSaved = await newUser.save();

    // Creamos un token para nuestro usuario
    const token = await createAccessToken({ id: userSaved._id });

    // Enviamos el token en la respuesta
    res.json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } created successfully`,
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
    // Si sale mal, enviamos una respuesta al cliente
    res.status(500).json({ message: error.message });
  }
};

//funcion para hacer iniciar sesion
export const login = async (req, res) => {
  // Extraemos los campos del body que nos envían
  const { userType, email, password } = req.body;

  try {
    let userFound;

    // Verificamos el tipo de usuario
    if (userType === "veterinarian") {
      // Buscamos si el veterinario existe
      userFound = await Veterinarian.findOne({ email });
    } else if (userType === "client") {
      // Buscamos si el cliente existe
      userFound = await Client.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Si no lo encuentra mandamos una respuesta de error
    if (!userFound)
      return res.status(400).json({
        message: `${
          userType.charAt(0).toUpperCase() + userType.slice(1)
        } not found`,
      });

    // Si encuentra uno, usamos bcrypt para hacer una comparación de la contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);

    // Si la contraseña no coincide respondemos una respuesta de error
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    // Creamos un token para nuestro usuario encontrado
    const token = await createAccessToken({ id: userFound._id });

    // Enviamos el token en la respuesta
    res.json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } login successfully`,
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
    // Si sale mal, enviamos una respuesta al cliente
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  //en el cliente eliminaremos el token y con eso cerramos la sesion
  return res.status(200).json({ message: "Logout successful" });
};
