import mongoose from "mongoose";

// Definimos el esquema de las mascotas
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true, // Ejemplo: perro, gato, etc.
    },
    breed: {
      type: String, // Raza de la mascota (opcional)
    },
    age: {
      type: Number, // Edad en años
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Relación con el cliente (dueño)
      required: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-icon/animal-pet-silhouette_318-675028.jpg", // Imagen predeterminada
    },
  },
  { timestamps: true }
);

// Exportamos el modelo de la mascota
export default mongoose.model("Pet", petSchema);
