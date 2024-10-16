//aqui estara todo lo necesario para arrancar el servidor entero
//en modulos creados por mi es necesario poner el.js
import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config(); // Cargar las variables de entorno

//conectamos a la base de datos
connectDB();

//Escuchar en el puerto definido en las variables de entorno
app.listen(process.env.PORT);

console.log("Server escuchando en puerto ", process.env.PORT);
