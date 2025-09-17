//Rutas de citas
import { Router } from "express";

import {
  createAppointment,
  getAppointmentsByClient,
  getAppointmentsByVeterinarian,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Ruta para crear una cita
router.post("/", authRequired, createAppointment);

// Ruta para obtener las citas de un cliente (requiere autenticación)
router.get("/client", authRequired, getAppointmentsByClient);

// Ruta para obtener las citas de un veterinario específico (requiere autenticación)
router.get("/veterinarian", authRequired, getAppointmentsByVeterinarian);

// Ruta para modificar el estado de una cita
router.put("/:idAppointment/status", authRequired, updateAppointmentStatus);

//exportamos las rutas
export default router;
