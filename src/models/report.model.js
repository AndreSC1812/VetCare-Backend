import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Información del propietario
    ownerName: {
      type: String,
      required: true,
    },
    ownerPhone: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },

    // Información de la mascota
    petId: {
      // ID de la mascota
      type: String,
      required: true,
    },
    petName: {
      // Nombre de la mascota
      type: String,
      required: true,
    },
    chipNumber: {
      type: String,
      default: null,
    },
    species: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      default: null,
    },

    // Información del informe
    consultationDate: {
      type: Date,
      required: true,
    },
    consultationReason: {
      type: String,
      required: true,
    },
    clinicalSigns: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatment: {
      type: String,
      required: true,
    },
    recommendations: {
      type: String,
      required: true,
    },

    veterinarianId: {
      // ID del veterinario (solo se guarda el ID, no una referencia)
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
