// controlador para el perfil del usuario
import Client from "../models/client.model.js";
import Veterinarian from "../models/veterinarian.model.js";

export const uploadProfileImage = async (req, res) => {
  const { id, userType } = req.user; // Extraemos el id y el tipo de usuario desde el token

  // Asegúrate de que el archivo se haya subido correctamente
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Aquí se genera la URL pública de la imagen usando el nombre del archivo guardado
  const imagePath = `http://192.168.0.29:3000/uploads/${req.file.filename}`;

  const Model = userType === "veterinarian" ? Veterinarian : Client;

  try {
    // Actualizamos el perfil del usuario con la nueva imagen
    const user = await Model.findByIdAndUpdate(
      id,
      { profileImage: imagePath },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respondemos con el mensaje y la URL de la imagen actualizada
    res.json({
      message: "Profile image uploaded successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfileData = async (req, res) => {
  const { id, userType } = req.user; // Obtenemos `id` y `userType` del token

  try {
    let user;

    if (userType === "veterinarian") {
      // Si es un veterinario, obtenemos los campos relevantes
      const {
        fullname,
        username,
        email,
        phone,
        specialization,
        yearsOfExperience,
        clinicAddress,
      } = req.body;

      const updateData = {};
      if (fullname) updateData.fullname = fullname;
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (specialization) updateData.specialization = specialization;
      if (yearsOfExperience) updateData.yearsOfExperience = yearsOfExperience;
      if (clinicAddress) updateData.clinicAddress = clinicAddress;

      // Actualizamos al veterinario
      user = await Veterinarian.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } else {
      // Si es un cliente, obtenemos los campos relevantes
      const { fullname, username, email, phone, address } = req.body;

      const updateData = {};
      if (fullname) updateData.fullname = fullname;
      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;

      // Actualizamos al cliente
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
