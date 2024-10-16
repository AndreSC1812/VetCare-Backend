import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Funcion para crear un token de acceso
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2d" },
      (err, token) => {
        if (err) console.log(err);
        resolve(token);
      }
    );
  });
}
