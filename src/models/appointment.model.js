import mongoose from "mongoose";

// Appointment schema structure
const appointmentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Reference to Client model
      required: true,
    },
    veterinarianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian", // Reference to Veterinarian model
      required: true,
    },
    veterinarianFullName: {
      type: String,
      required: true,
    },
    clientFullName: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // Appointment date
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"], // Appointment status
      default: "Pending", // Default status
    },
  },
  { timestamps: true } // Include createdAt and updatedAt timestamps
);

// Export the Appointment model
export default mongoose.model("Appointment", appointmentSchema);
