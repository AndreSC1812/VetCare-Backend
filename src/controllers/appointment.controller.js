import Appointment from "../models/appointment.model.js";
import Veterinarian from "../models/veterinarian.model.js"; // Import the Veterinarian model
import Client from "../models/client.model.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const { id: clientId } = req.user; // Extract the client ID from the token
  const { idVeterinarian, date } = req.body; // The veterinarian ID and the appointment date come from the request body

  try {
    // Check if the client exists
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Check if the veterinarian exists
    const veterinarian = await Veterinarian.findById(idVeterinarian);
    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }

    // Create the new appointment
    const newAppointment = new Appointment({
      idClient: clientId, // Client ID from the token
      idVeterinarian: idVeterinarian, // Veterinarian ID passed in the body
      veterinarianFullname: veterinarian.fullname, // Veterinarian's full name
      clientFullname: client.fullname, // Client's full name
      date: new Date(date), // Appointment date
      status: "Pending", // Initial appointment status
    });

    await newAppointment.save(); // Save the new appointment to the database

    // Respond with the created appointment
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the appointment" });
  }
};

// Show appointments for a specific client
export const getAppointmentsByClient = async (req, res) => {
  const { id: clientId } = req.user; // Extract the client ID from the token

  try {
    // Get the client's appointments
    const appointments = await Appointment.find({ idClient: clientId })
      .populate("idVeterinarian", "fullname") // Populate veterinarian to show their name
      .exec();

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No appointments found for this client." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving the client's appointments." });
  }
};

// Show appointments for a specific veterinarian
export const getAppointmentsByVeterinarian = async (req, res) => {
  const { id } = req.user; // Extract the veterinarian ID from the token

  try {
    // Get the veterinarian's appointments
    const appointments = await Appointment.find({ idVeterinarian: id })
      .populate("idClient", "fullname") // Populate client to show their name
      .exec();

    if (appointments.length === 0) {
      return res
        .status(200)
        .json({ message: "No appointments available for this veterinarian." }); // Changed 404 to 200
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving the veterinarian's appointments." });
  }
};

// Update an appointment's status
export const updateAppointmentStatus = async (req, res) => {
  const { idAppointment } = req.params; // Extract the appointment ID from the parameters
  const { status } = req.body; // The new status (Pending, Confirmed, Cancelled, etc.)

  if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(idAppointment);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Verify that the veterinarian trying to modify the appointment is the one assigned
    if (appointment.idVeterinarian.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You do not have permission to modify this appointment" });
    }

    // Update the appointment status
    appointment.status = status;
    await appointment.save(); // Save changes

    res.status(200).json(appointment); // Respond with the updated appointment
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating the appointment status" });
  }
};
