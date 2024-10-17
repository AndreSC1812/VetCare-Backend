//estructura de nuestro cliente
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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
    address: {
      type: String, // Dirección del cliente
    },
    phone: {
      type: String, // Número de teléfono del cliente
    },
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet", // Referencia a las mascotas
      },
    ],
  },
  { timestamps: true }
);

// Exportamos el modelo del cliente
export default mongoose.model("Client", clientSchema);
