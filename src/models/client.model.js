// Client schema
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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
    address: {
      type: String, // Client address
    },
    phone: {
      type: String, // Client phone number
    },
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet", // Reference to pets
      },
    ],
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg",
    },
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

// Export the Client model
export default mongoose.model("Client", clientSchema);
