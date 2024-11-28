//estructura de nuestro cliente
import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
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
    profileImage: {
      type: String,
      default:
        "https://img.freepik.com/vector-premium/icono-perfil-usuario-estilo-plano-ilustracion-vector-avatar-miembro-sobre-fondo-aislado-concepto-negocio-signo-permiso-humano_157943-15752.jpg",
    },
  },
  { timestamps: true }
);

// Exportamos el modelo del cliente
export default mongoose.model("Client", clientSchema);
