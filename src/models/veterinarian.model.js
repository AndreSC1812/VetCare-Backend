//estructura de nuestro Veterinario
import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema(
  {
    fullname: {
      type: String, // Nombre completo
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    specialization: {
      type: String, // Especialización (ej. Cirugía, dermatología, etc.)
    },
    yearsOfExperience: {
      type: Number, // Años de experiencia
    },
    clinicAddress: {
      type: String, // Dirección de la clínica
    },
    phone: {
      type: String, // Número de teléfono
    },
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg",
    },
    startTime: {
      type: String, // Hora de inicio (formato 24h, ej. "09:00")
    },
    endTime: {
      type: String, // Hora de fin (formato 24h, ej. "17:00")
    },
  },
  { timestamps: true }
);

//para interactuar con la base de datos CRUD
export default mongoose.model("Veterinarian", veterinarianSchema);
