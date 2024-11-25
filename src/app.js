//aqui estara todo el codigo del backend(express)
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
//importamos las rutas de autenticacion
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";

//usamos app como nuestra instancia de express
const app = express();

//configuramos multer para guardar imagenes en una carpeta uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

//usaremos cors para que cualquiera pueda hacer peticiones al backend
app.use(cors());

//usaremos morgan para que nos mande mensajes de las peticiones por consola
app.use(morgan("dev"));

//parsear el cuerpo de las solicitudes en JSON
app.use(express.json());

// Configurar carpeta de archivos estáticos(Para que sea accesible a la hora de hacer un get)
app.use("/uploads", express.static("uploads"));

//rutas de autenticacion
app.use("/api/auth", authRoutes);

//ruta de perfil
app.use("/api/profile", profileRoutes(upload));

//exportamos el app
export default app;
