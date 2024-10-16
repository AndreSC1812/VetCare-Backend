//estructura de nuestro Veterinario
import mongoose from "mongoose";

const veterinarianSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

//para interactuar con la base de datos CRUD
export default mongoose.model("Veterinarian", veterinarianSchema);
