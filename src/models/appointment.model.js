import mongoose from "mongoose";

// Estructura del esquema de citas
const appointmentSchema = new mongoose.Schema(
  {
    idClient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Referencia al modelo del cliente
      required: true,
    },
    idVeterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian", // Referencia al modelo del veterinario
      required: true,
    },
    veterinarianFullname: {
      type: String,
      required: true,
    },
    clientFullname: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // La fecha de la cita
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendiente", "Confirmada", "Cancelada"], // Estatus de la cita
      default: "Pendiente", // Establecer "Pendiente" como el estado predeterminado
    },
  },
  { timestamps: true } // Incluir timestamps de creación y actualización
);

// Exportamos el modelo de la cita
export default mongoose.model("Appointment", appointmentSchema);
