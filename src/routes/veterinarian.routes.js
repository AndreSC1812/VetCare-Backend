import { Router } from "express";
import {
  getAllVeterinarians,
  getVeterinarianById,
} from "../controllers/veterinarian.controller.js";

const router = Router();

// Routes to list and retrieve veterinarians
router.get("/", getAllVeterinarians); // List all veterinarians
router.get("/:id", getVeterinarianById); // Get a specific veterinarian by ID

export default router;
