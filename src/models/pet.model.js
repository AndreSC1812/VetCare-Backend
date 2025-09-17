import mongoose from "mongoose";

// Define the Pet schema
const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true, // Example: dog, cat, etc.
    },
    age: {
      type: Number, // Age in years
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to the client (owner)
      required: true,
    },
    image: {
      type: String,
      default:
        "https://img.freepik.com/free-icon/animal-pet-silhouette_318-675028.jpg", // Default image
    },
    chipNumber: {
      type: String, // Pet's microchip number
    },
    weight: {
      type: Number, // Pet weight in KG
    },
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

// Export the Pet model
export default mongoose.model("Pet", petSchema);
