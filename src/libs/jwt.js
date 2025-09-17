import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Function to create an access token
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "2d" }, // Token expires in 2 days
      (err, token) => {
        if (err) {
          console.error("Error creating JWT:", err);
          return reject(err);
        }
        resolve(token);
      }
    );
  });
}
