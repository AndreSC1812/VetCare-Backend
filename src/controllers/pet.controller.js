import Pet from "../models/pet.model.js";
import Client from "../models/client.model.js";
import dotenv from "dotenv";
dotenv.config();

// Upload pet image
export const uploadPetImage = async (req, res) => {
  const { petId } = req.params; // Pet ID in the URL

  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Use the environment variable to build the URL
  const imagePath = `${process.env.IMAGE_URL_BASE}${req.file.filename}`;

  try {
    // Find the pet by its ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Update the pet with the image URL
    pet.image = imagePath;

    // Save the pet with the new image
    await pet.save();

    res.json({
      message: "Pet image uploaded successfully",
      petImage: pet.image,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new pet and associate it to the client
export const createPet = async (req, res) => {
  const { name, species, age, chipNumber, weight } = req.body; // Now chipNumber and weight are required
  const { id } = req.user; // Client ID extracted from the token

  try {
    // Check that the client exists
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Create the pet and associate it to the client
    const newPet = new Pet({
      name,
      species,
      age,
      chipNumber, // New field
      weight, // New field
      owner: id, // Assign client as pet owner
    });

    // Save the pet in the database
    const savedPet = await newPet.save();

    // Add the pet to the client's profile
    client.pets.push(savedPet._id);
    await client.save();

    res.status(201).json({
      message: "Pet created successfully",
      pet: savedPet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all pets for a specific client
export const getPetsByClient = async (req, res) => {
  const { clientId } = req.params; // Client ID in the URL

  try {
    // Find the client and populate their pets list
    const client = await Client.findById(clientId).populate("pets");

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({ pets: client.pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a pet
export const updatePet = async (req, res) => {
  const { petId } = req.params; // Pet ID in the URL
  const { name, species, age, image, chipNumber, weight } = req.body; // New pet data

  try {
    // Find the pet by its ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Update pet fields if provided
    if (name) pet.name = name;
    if (species) pet.species = species;
    if (age) pet.age = age;
    if (image) pet.image = image;
    if (chipNumber) pet.chipNumber = chipNumber;
    if (weight) pet.weight = weight;

    // Save the pet with the new changes
    await pet.save();

    res.json({
      message: "Pet updated successfully",
      pet,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a pet
export const deletePet = async (req, res) => {
  const { petId } = req.params; // Pet ID in the URL
  const { id } = req.user; // Client ID extracted from the token

  try {
    // Find the pet by its ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Verify that the client is the pet owner before deleting it
    if (pet.owner.toString() !== id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this pet" });
    }

    // Delete the pet from the pets collection
    await pet.deleteOne();

    // Remove the pet from the client's profile
    const client = await Client.findById(id);
    if (client) {
      client.pets = client.pets.filter(
        (p) => p.toString() !== petId
      );
      await client.save();
    }

    res.json({
      message: "Pet deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get pet details by its ID
export const getPetById = async (req, res) => {
  const { petId } = req.params; // Get petId from URL parameters

  try {
    // Find the pet by its ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ pet }); // Return pet details
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
