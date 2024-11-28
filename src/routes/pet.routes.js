import { Router } from "express";
import {
  createPet,
  getPetsByClient,
  updatePet,
  deletePet,
  uploadPetImage,
} from "../controllers/pet.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

// Recibe 'upload' como parámetro
export default (upload) => {
  const router = Router();

  // Ruta para crear una nueva mascota
  router.post("/", authRequired, createPet);

  // Ruta para obtener todas las mascotas de un cliente específico
  router.get("/:clientId", getPetsByClient);

  // Ruta para actualizar una mascota
  router.put("/:petId", authRequired, updatePet);

  // Ruta para eliminar una mascota
  router.delete("/:petId", authRequired, deletePet);

  // Ruta para subir imagen de la mascota
  router.post(
    "/:petId/upload", // Ruta para subir la imagen de la mascota
    authRequired,
    upload.single("petImage"), // Usamos multer aquí
    uploadPetImage
  );

  return router;
};
