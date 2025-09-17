import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Middleware to validate user token
export const authRequired = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization");

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Access denied. Token missing." });
  }

  // Remove "Bearer " prefix if present
  const bearerToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);

    // Attach user info to the request
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid tokens
    res.status(401).json({ message: "Invalid token" });
  }
};
