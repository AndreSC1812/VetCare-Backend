import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

// Middleware para validar el token del usuario
export const authRequired = (req, res, next) => {
  // Extraer el token del encabezado Authorization
  const token = req.header("Authorization");

  // Comprobar si el token está presente
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  // Eliminar el prefijo "Bearer " del token, si está presente
  const bearerToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

  try {
    // Verificar el token y decodificar su carga
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    // Adjuntar la información del usuario a la solicitud
    req.user = decoded;

    // Pasar al siguiente middleware o controlador de ruta
    next();
  } catch (error) {
    // Manejar tokens inválidos
    res.status(401).json({ message: "Invalid token" });
  }
};
