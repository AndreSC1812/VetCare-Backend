import Client from "../models/client.model.js";

// Listar todos los clientes sin mostrar la contraseña
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select("-password");
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving clients" });
  }
};

// Obtener un cliente específico sin mostrar la contraseña
export const getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findOne({ _id: id }).select("-password");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving client" });
  }
};
