import mongoose from "mongoose";

// Define the Veterinarian schema
const veterinarianSchema = new mongoose.Schema(
  {
    fullName: {
      type: String, // Full name
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
      type: String, // Specialization (e.g., Surgery, Dermatology, etc.)
    },
    yearsOfExperience: {
      type: Number, // Years of experience
    },
    clinicAddress: {
      type: String, // Clinic address
    },
    phone: {
      type: String, // Phone number
    },
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg",
    },
    startTime: {
      type: String, // Start time (24h format, e.g., "09:00")
    },
    endTime: {
      type: String, // End time (24h format, e.g., "17:00")
    },
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

// Export the Veterinarian model for CRUD operations
export default mongoose.model("Veterinarian", veterinarianSchema);
