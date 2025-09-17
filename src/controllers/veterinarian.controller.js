import Veterinarian from "../models/veterinarian.model.js";

// List all veterinarians without showing the password
export const getAllVeterinarians = async (req, res) => {
  try {
    const veterinarians = await Veterinarian.find().select("-password");
    res.json(veterinarians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving veterinarians" });
  }
};

// Get a specific veterinarian without showing the password
export const getVeterinarianById = async (req, res) => {
  const { id } = req.params;
  try {
    const veterinarian = await Veterinarian.findOne({ _id: id }).select(
      "-password"
    );
    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinarian not found" });
    }
    res.json(veterinarian);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving veterinarian" });
  }
};
