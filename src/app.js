// Main backend code (Express)
import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import path from "path";

// Import route modules
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import clientRoutes from "./routes/client.routes.js";
import veterinarianRoutes from "./routes/veterinarian.routes.js";
import petRoutes from "./routes/pet.routes.js";
import emailRoutes from "./routes/email.routes.js";
import reportRoutes from "./routes/report.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

// Initialize Express app
const app = express();

// Configure multer to store uploaded images in the "uploads" folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname); // Extract file extension
    cb(null, Date.now() + fileExtension); // Use timestamp + extension as filename
  },
});

const upload = multer({ storage });

// Enable CORS for all requests
app.use(cors());

// Use morgan to log HTTP requests to the console
app.use(morgan("dev"));

// Parse JSON bodies of incoming requests
app.use(express.json());

// Serve static files from the uploads folder
app.use("/uploads", express.static("uploads"));

// Authentication routes
app.use("/api/auth", authRoutes);

// Profile routes
app.use("/api/profile", profileRoutes(upload));

// Routes for clients and veterinarians
app.use("/api/clients", clientRoutes);
app.use("/api/veterinarians", veterinarianRoutes);

// Pet routes
app.use("/api/pets", petRoutes(upload));

// Email notification routes
app.use("/api/email", emailRoutes);

// Report routes
app.use("/api/reports", reportRoutes);

// Appointment routes
app.use("/api/appointments", appointmentRoutes);

// Export the Express app
export default app;
