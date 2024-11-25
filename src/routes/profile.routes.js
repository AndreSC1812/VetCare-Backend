// routes/profile.routes.js
import { Router } from "express";
import {
  uploadProfileImage,
  updateProfileData,
} from "../controllers/profile.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

export default (upload) => {
  const router = Router();

  // Ruta para subir imagen de perfil
  router.post(
    "/upload",
    authRequired,
    upload.single("profileImage"),
    uploadProfileImage
  );

  // Ruta para actualizar datos del perfil
  router.put("/update", authRequired, updateProfileData);

  return router;
};
