import { Router } from "express";
import {
  createPet,
  getPetsByClient,
  updatePet,
  deletePet,
  uploadPetImage,
  getPetById,
} from "../controllers/pet.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

// Receives 'upload' as a parameter (for multer)
export default (upload) => {
  const router = Router();

  // Route to create a new pet
  router.post("/", authRequired, createPet);

  // Route to get all pets of a specific client
  router.get("/:clientId", getPetsByClient);

  // Route to get pet details by pet ID
  router.get("/pet/:petId", getPetById);

  // Route to update a pet
  router.put("/:petId", authRequired, updatePet);

  // Route to delete a pet
  router.delete("/:petId", authRequired, deletePet);

  // Route to upload a pet image
  router.post(
    "/:petId/upload",
    authRequired,
    upload.single("petImage"), // Using multer for file upload
    uploadPetImage
  );

  return router;
};
