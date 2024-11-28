import { Router } from "express";
import { sendNotification } from "../controllers/email.controller.js";

const router = Router();

// Ruta para enviar notificaciones por correo
router.post("/sendNotification", sendNotification);

export default router;
