// Controller for user profile
import Client from "../models/client.model.js";
import Veterinarian from "../models/veterinarian.model.js";
import dotenv from "dotenv";
dotenv.config();

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  const { id, userType } = req.user; // Extract user ID and type from token

  // Ensure a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use environment variable to build the image URL
  const imagePath = `${process.env.IMAGE_URL_BASE}${req.file.filename}`;

  const Model = userType === "veterinarian" ? Veterinarian : Client;

  try {
    // Update user profile with the new image
    const user = await Model.findByIdAndUpdate(
      id,
      { profileImage: imagePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with message and updated image URL
    res.json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update profile data
export const updateProfileData = async (req, res) => {
  const { id, userType } = req.user; // Get `id` and `userType` from token

  try {
    let user;

    if (userType === "veterinarian") {
      // If user is a veterinarian, get relevant fields
      const {
        fullname,
        username,
        email,
        phone,
        specialization,
        yearsOfExperience,
        clinicAddress,
        startTime,
        endTime,
      } = req.body;

      const updateData = {};
      if (fullname) updateData.fullname = fullname;
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (specialization) updateData.specialization = specialization;
      if (yearsOfExperience) updateData.yearsOfExperience = yearsOfExperience;
      if (clinicAddress) updateData.clinicAddress = clinicAddress;
      if (startTime) updateData.startTime = startTime;
      if (endTime) updateData.endTime = endTime;

      // Update veterinarian
      user = await Veterinarian.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } else {
      // If user is a client, get relevant fields
      const { fullname, username, email, phone, address } = req.body;

      const updateData = {};
      if (fullname) updateData.fullname = fullname;
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;

      // Update client
      user = await Client.findByIdAndUpdate(id, updateData, { new: true });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile data updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
