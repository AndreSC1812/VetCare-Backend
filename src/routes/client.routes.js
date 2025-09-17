import { Router } from "express";
import {
  getAllClients,
  getClientById,
} from "../controllers/client.controller.js";

const router = Router();

// Routes to list and retrieve clients
router.get("/", getAllClients); // List all clients
router.get("/:id", getClientById); // Get a specific client by ID

export default router;
