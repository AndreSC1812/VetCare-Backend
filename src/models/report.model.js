import mongoose from "mongoose";

// Define the Report schema
const reportSchema = new mongoose.Schema(
  {
    // Owner information
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

    // Pet information
    petId: {
      type: String, // Pet ID
      required: true,
    },
    petName: {
      type: String, // Pet name
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
      default: null, // Weight in KG
    },

    // Report details
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
      type: String, // Veterinarian ID (only storing ID, not reference)
      required: true,
    },
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

// Export the Report model
export default mongoose.model("Report", reportSchema);
