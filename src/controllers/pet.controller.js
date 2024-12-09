import Pet from "../models/pet.model.js";
import Client from "../models/client.model.js";

// Subir imagen de la mascota
export const uploadPetImage = async (req, res) => {
  const { petId } = req.params; // ID de la mascota en la URL

  // Verifica si el archivo fue cargado
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  // Generar la URL pública de la imagen usando el nombre del archivo guardado
  const imagePath = `http://192.168.0.29:3000/uploads/${req.file.filename}`;

  try {
    // Buscar la mascota por su ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Actualizar la mascota con la URL de la imagen
    pet.image = imagePath;

    // Guardar la mascota con la nueva imagen
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

// Crear una nueva mascota y asociarla al cliente
export const createPet = async (req, res) => {
  const { name, species, age, chipNumber, weight } = req.body; // Ahora chipNumber y weight son requeridos
  const { id } = req.user; // ID del cliente extraído del token

  try {
    // Verificar que el cliente existe
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Crear la mascota y asociarla al cliente
    const newPet = new Pet({
      name,
      species,
      age,
      chipNumber, // Nuevo campo
      weight, // Nuevo campo
      owner: id, // Asigna el cliente como dueño de la mascota
    });

    // Guardar la mascota en la base de datos
    const savedPet = await newPet.save();

    // Agregar la mascota al perfil del cliente
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

// Obtener todas las mascotas de un cliente específico
export const getPetsByClient = async (req, res) => {
  const { clientId } = req.params; // ID del cliente en la URL

  try {
    // Buscar al cliente y poblar su lista de mascotas
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

// Actualizar una mascota
export const updatePet = async (req, res) => {
  const { petId } = req.params; // ID de la mascota en la URL
  const { name, species, age, image, chipNumber, weight } = req.body; // Nuevos datos de la mascota

  try {
    // Buscar la mascota por su ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Actualizamos los campos de la mascota si se proporcionan
    if (name) pet.name = name;
    if (species) pet.species = species;
    if (age) pet.age = age;
    if (image) pet.image = image;
    if (chipNumber) pet.chipNumber = chipNumber; // Actualizamos el chipNumber
    if (weight) pet.weight = weight; // Actualizamos el peso

    // Guardamos la mascota con los nuevos cambios
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

// Eliminar una mascota
export const deletePet = async (req, res) => {
  const { petId } = req.params; // ID de la mascota en la URL
  const { id } = req.user; // ID del cliente extraído del token

  try {
    // Buscar la mascota por su ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Verificar si el cliente es el dueño de la mascota antes de eliminarla
    if (pet.owner.toString() !== id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this pet" });
    }

    // Eliminar la mascota de la colección de mascotas
    await pet.deleteOne();

    // Eliminar la mascota del perfil del cliente
    const client = await Client.findById(id);
    if (client) {
      client.pets = client.pets.filter((petId) => petId.toString() !== petId);
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

// Obtener detalles de una mascota por su ID
export const getPetById = async (req, res) => {
  const { petId } = req.params; // Obtener el petId desde los parámetros de la URL

  try {
    // Buscar la mascota por su ID
    const pet = await Pet.findById(petId);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json({ pet }); // Retornar los detalles de la mascota
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
