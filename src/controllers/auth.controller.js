//importamos nuestros tipos de usuarios
import Veterinarian from "../models/veterinarian.model.js";
//importamos bcryptjs para encriptar las contraseñas de nuestros usuarios
import bcrypt from "bcryptjs";
//importamos la funcion que crea un token jwt
import { createAccessToken } from "../libs/jwt.js";

//exportamos las funciones asincronas(por que son peticiones a la base de datos) de los controllers
export const register = async (req, res) => {
  //extraemos los campos del body que nos envian
  const { email, password, username } = req.body;

  try {
    //ejecutamos bcrypt para encriptar la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //creamos un objeto veterinario
    const newVeterinarian = new Veterinarian({
      username,
      email,
      //usamos la contraseña encriptada en la base de datos
      password: passwordHash,
    });

    //lo guardamos en la base de datos
    const veterinarianSaved = await newVeterinarian.save();

    //creamos un token para nuestro veterianario
    const token = await createAccessToken({ id: veterinarianSaved._id });

    // Enviamos el token en la respuesta
    res.json({
      message: "User created successfully",
      token,
      veterinarian: {
        id: veterinarianSaved._id,
        username: veterinarianSaved.username,
        email: veterinarianSaved.email,
        createdAt: veterinarianSaved.createdAt,
        updatedAt: veterinarianSaved.updatedAt,
      },
    });
  } catch (error) {
    //si sale mal enviamos una respuesta al cliente
    res.status(500).json({ message: error.message });
  }
};

export const login = (req, res) => res.send("login");
