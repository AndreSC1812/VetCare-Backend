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

// Route to create a new report
router.post("/", authRequired, createReport);

// Route to get reports by pet
router.get("/pet/:petId", authRequired, getReportsByPet);

// Route to get reports created by a veterinarian
router.get("/veterinarian", authRequired, getReportsByVeterinarian);

// Route to get a report by ID
router.get("/:reportId", authRequired, getReportById);

// Route to update a report
router.put("/:reportId", authRequired, updateReport);

// Route to delete a report
router.delete("/:reportId", authRequired, deleteReport);

export default router;
