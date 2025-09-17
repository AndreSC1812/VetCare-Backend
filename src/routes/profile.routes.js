// routes/profile.routes.js
import { Router } from "express";
import {
  uploadProfileImage,
  updateProfileData,
} from "../controllers/profile.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

export default (upload) => {
  const router = Router();

  // Route to upload profile image
  router.post(
    "/upload",
    authRequired,
    upload.single("profileImage"),
    uploadProfileImage
  );

  // Route to update profile data
  router.put("/update", authRequired, updateProfileData);

  return router;
};
