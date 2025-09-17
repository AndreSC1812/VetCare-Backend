// Authentication routes
import { Router } from "express";

// Import controller functions
import {
  login,
  register,
  logout,
  profile,
} from "../controllers/auth.controller.js";

import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

// Route to register a new user
router.post("/register", register);

// Route to login a user
router.post("/login", login);

// Route to logout a user
router.post("/logout", logout);

// Route to get the authenticated user's profile (requires authentication)
router.get("/profile", authRequired, profile);

// Export the authentication routes
export default router;
