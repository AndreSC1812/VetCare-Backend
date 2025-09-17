// Appointment routes
import { Router } from "express";

import {
  createAppointment,
  getAppointmentsByClient,
  getAppointmentsByVeterinarian,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Route to create a new appointment
router.post("/", authRequired, createAppointment);

// Route to get appointments for a client (requires authentication)
router.get("/client", authRequired, getAppointmentsByClient);

// Route to get appointments for a specific veterinarian (requires authentication)
router.get("/veterinarian", authRequired, getAppointmentsByVeterinarian);

// Route to update the status of an appointment
router.put("/:appointmentId/status", authRequired, updateAppointmentStatus);

// Export the appointment routes
export default router;
