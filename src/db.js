//aqui estara nuestra conexion a la base de datos MongoDB
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

//funcion asincrona para conectar a MongoDB atlas
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("conectado a mongodb");
  } catch (error) {
    console.log(error);
  }
};
