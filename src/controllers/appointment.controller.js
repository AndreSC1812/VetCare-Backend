import Appointment from "../models/appointment.model.js";
import Veterinarian from "../models/veterinarian.model.js"; // Importa el modelo de Veterinario
import Client from "../models/client.model.js";

// Crear una nueva cita
export const createAppointment = async (req, res) => {
  const { id: clientId } = req.user; // Extraemos el ID del cliente desde el token
  const { idVeterinarian, date } = req.body; // El ID del veterinario y la fecha de la cita vienen del cuerpo de la solicitud

  try {
    // Verificamos si el cliente existe
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Verificamos si el veterinario existe
    const veterinarian = await Veterinarian.findById(idVeterinarian);
    if (!veterinarian) {
      return res.status(404).json({ message: "Veterinario no encontrado" });
    }

    // Crear la nueva cita
    const newAppointment = new Appointment({
      idClient: clientId, // ID del cliente desde el token
      idVeterinarian: idVeterinarian, // ID del veterinario pasado en el cuerpo
      veterinarianFullname: veterinarian.fullname, // Nombre completo del veterinario
      clientFullname: client.fullname, // Nombre completo del cliente
      date: new Date(date), // Fecha de la cita
      status: "Pendiente", // Estado inicial de la cita
    });

    await newAppointment.save(); // Guardamos la nueva cita en la base de datos

    // Respondemos con la cita creada
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la cita" });
  }
};

// Mostrar las citas de un cliente específico
export const getAppointmentsByClient = async (req, res) => {
  const { id: clientId } = req.user; // Extraemos el ID del cliente desde el token

  try {
    // Obtener las citas del cliente
    const appointments = await Appointment.find({ idClient: clientId })
      .populate("idVeterinarian", "fullname") // Poblamos el veterinario para mostrar su nombre
      .exec();

    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron citas para este cliente." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las citas del cliente." });
  }
};

// Mostrar las citas de un veterinario específico
export const getAppointmentsByVeterinarian = async (req, res) => {
  const { id } = req.user; // Extraemos el ID del veterinario desde el token

  try {
    // Obtener las citas del veterinario
    const appointments = await Appointment.find({ idVeterinarian: id })
      .populate("idClient", "fullname") // Poblamos el cliente para mostrar su nombre
      .exec();

    if (appointments.length === 0) {
      return res
        .status(200)
        .json({ message: "No hay citas disponibles para este veterinario." }); // Cambiar 404 por 200
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener las citas del veterinario." });
  }
};

// Modificar el estado de una cita
export const updateAppointmentStatus = async (req, res) => {
  const { idAppointment } = req.params; // Extraemos el ID de la cita desde los parámetros
  const { status } = req.body; // El nuevo estado (Confirmada, Cancelada, etc.)

  if (!["Pendiente", "Confirmada", "Cancelada"].includes(status)) {
    return res.status(400).json({ message: "Estado no válido" });
  }

  try {
    // Buscar la cita por ID
    const appointment = await Appointment.findById(idAppointment);

    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Verificar que el veterinario que intenta modificar la cita sea el mismo que está asignado a la cita
    if (appointment.idVeterinarian.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para modificar esta cita" });
    }

    // Actualizar el estado de la cita
    appointment.status = status;
    await appointment.save(); // Guardamos los cambios

    res.status(200).json(appointment); // Respondemos con la cita actualizada
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el estado de la cita" });
  }
};
