import { Router } from "express";
import {
  getAllVeterinarians,
  getVeterinarianById,
} from "../controllers/veterinarian.controller.js";

const router = Router();

// Rutas para listar y obtener veterinarios
router.get("/", getAllVeterinarians); // Listar todos los veterinarios
router.get("/:id", getVeterinarianById); // Obtener veterinario específico por ID

export default router;
