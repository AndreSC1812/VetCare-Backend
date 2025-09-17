// MongoDB database connection
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Async function to connect to MongoDB Atlas
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};
