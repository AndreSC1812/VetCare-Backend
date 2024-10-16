//aqui estara todo el codigo del backend(express)
import express from "express";
import morgan from "morgan";

//usamos app como nuestra instancia de express
const app = express();

//usaremos morgan para que nos mande mensajes de las peticiones por consola
app.use(morgan("dev"));

//exportamos el app
export default app;
