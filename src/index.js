// Entry point to start the entire server
// For my custom modules, it's necessary to include the .js extension
import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Connect to the database
connectDB();

// Start listening on the port defined in environment variables
app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
