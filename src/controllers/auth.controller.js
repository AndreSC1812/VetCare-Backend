// import our user types
import Veterinarian from "../models/veterinarian.model.js";
import Client from "../models/client.model.js";
// import bcryptjs to encrypt our users' passwords
import bcrypt from "bcryptjs";
// import the function that creates a JWT token
import { createAccessToken } from "../libs/jwt.js";

// Function to register
export const register = async (req, res) => {
  const { userType, email, password, username } = req.body;

  try {
    // Check the user type
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Check if a user with the same email already exists
    const emailExists = await (userType === "veterinarian"
      ? Veterinarian
      : Client
    ).findOne({ email });

    if (emailExists) {
      return res
        .status(400)
        .json({ message: "A user with that email already exists" });
    }

    // Check if a user with the same username already exists
    const usernameExists = await (userType === "veterinarian"
      ? Veterinarian
      : Client
    ).findOne({ username });

    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "A user with that username already exists" });
    }

    // Encrypt the password using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Create the user according to the type
    const newUser =
      userType === "veterinarian"
        ? new Veterinarian({ username, email, password: passwordHash })
        : new Client({ username, email, password: passwordHash });

    // Save to the database
    const userSaved = await newUser.save();

    // Create a token
    const token = await createAccessToken({
      id: userSaved._id,
      userType,
    });

    res.status(201).json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } created successfully`,
      token,
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        fullName: userSaved.fullName,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid data provided" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

// Function to log in
export const login = async (req, res) => {
  const { userType, email, password } = req.body;

  try {
    // Check the user type
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Find the user
    const userFound =
      userType === "veterinarian"
        ? await Veterinarian.findOne({ email })
        : await Client.findOne({ email });

    if (!userFound) {
      return res.status(404).json({
        message: `${
          userType.charAt(0).toUpperCase() + userType.slice(1)
        } not found`,
      });
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create a token
    const token = await createAccessToken({
      id: userFound._id,
      userType,
    });

    res.status(200).json({
      message: `${
        userType.charAt(0).toUpperCase() + userType.slice(1)
      } logged in successfully`,
      token,
      user: {
        id: userFound._id,
        fullname: userFound.fullname,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  // on the client we will delete the token and with that we log out
  return res.status(200).json({ message: "Logout successful" });
};

export const profile = async (req, res) => {
  const { id, userType } = req.user;

  try {
    // Check the user type
    if (!["veterinarian", "client"].includes(userType)) {
      return res.status(400).json({ message: "Invalid user type" });
    }

    // Find user according to type
    const user =
      userType === "veterinarian"
        ? await Veterinarian.findById(id).select("-password") // Exclude password
        : await Client.findById(id).select("-password").populate("pets"); // Exclude password and populate pets if client

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Response with full user data
    res.status(200).json({
      message: "User profile retrieved successfully",
      user, // Send all data except password
    });
  } catch (err) {
    console.error("Error retrieving user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};
