import { Router } from "express";
import { sendNotification } from "../controllers/email.controller.js";

const router = Router();

// Route to send email notifications
router.post("/sendNotification", sendNotification);

export default router;
