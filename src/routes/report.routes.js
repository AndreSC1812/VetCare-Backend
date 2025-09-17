import { Router } from "express";
import {
  createReport,
  getReportsByPet,
  getReportsByVeterinarian,
  updateReport,
  deleteReport,
  getReportById,
} from "../controllers/report.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Crear un nuevo informe
router.post("/", authRequired, createReport);

// Obtener informes por mascota
router.get("/pet/:petId", authRequired, getReportsByPet);

// Obtener informes creados por un veterinario
router.get("/veterinarian", authRequired, getReportsByVeterinarian);

// Obtener un informe por ID
router.get("/:reportId", authRequired, getReportById);

// Actualizar un informe
router.put("/:reportId", authRequired, updateReport);

// Eliminar un informe
router.delete("/:reportId", authRequired, deleteReport);

export default router;
