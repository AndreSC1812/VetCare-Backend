import { Router } from "express";
import {
  getAllClients,
  getClientById,
} from "../controllers/client.controller.js";

const router = Router();

// Rutas para listar y obtener clientes
router.get("/", getAllClients); // Listar todos los clientes
router.get("/:id", getClientById); // Obtener cliente específico por ID

export default router;
