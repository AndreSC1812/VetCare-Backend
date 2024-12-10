//aqui estara todo el codigo del backend(express)
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";
//importamos las rutas de autenticacion
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import clientRoutes from "./routes/client.routes.js";
import veterinarianRoutes from "./routes/veterinarian.routes.js";
import petRoutes from "./routes/pet.routes.js";
import emailRoutes from "./routes/email.routes.js";
import reportRoutes from "./routes/report.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

//usamos app como nuestra instancia de express
const app = express();

//configuramos multer para guardar imagenes en una carpeta uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Extrae la extensión del archivo
    cb(null, Date.now() + fileExtension); // Usa solo la marca de tiempo y la extensión
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

// Rutas para clientes y veterinarios
app.use("/api/clients", clientRoutes);

app.use("/api/veterinarians", veterinarianRoutes);

// Rutas de mascotas
app.use("/api/pets", petRoutes(upload));

// Rutas de correos
app.use("/api/email", emailRoutes);

// Rutas de informes
app.use("/api/reports", reportRoutes);

//Rutas de citas
app.use("/api/appointments", appointmentRoutes);

//exportamos el app
export default app;
