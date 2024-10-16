//aqui estara todo el codigo del backend(express)
import express from "express";
import morgan from "morgan";
//importamos las rutas de autenticacion
import authRoutes from "./routes/auth.routes.js";

//usamos app como nuestra instancia de express
const app = express();

//usaremos morgan para que nos mande mensajes de las peticiones por consola
app.use(morgan("dev"));

//parsear el cuerpo de las solicitudes en JSON
app.use(express.json());

//rutas de autenticacion
app.use("/api/auth", authRoutes);

//exportamos el app
export default app;
