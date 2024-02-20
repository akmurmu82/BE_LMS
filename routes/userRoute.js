const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const UserModel = require("../models/userModel");

const userRouter = express.Router();

// Register route
userRouter.post("/register", async (req, res) => {
  const { name, password, email, mobileNo } = req.body;

  try {
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user instance
    const newUser = new UserModel({
      name,
      password: hashedPassword,
      email,
      mobileNo,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).json({ message: "New user has been created" });
  } catch (error) {
    // Handle any errors
    res.status(400).json({ message: error.message });
  }
});

// Function to hash the password
async function hashPassword(password) {
  // Generate a salt and hash the password
  const hashedPassword = await bcrypt.hash(password, 5);
  return hashedPassword;
}

// Login route
userRouter.post("/login", async (req, res) => {
  const { email, phoneNo, password } = req.body;

  try {
    // Find the user by email
    const userDb = await UserModel.findOne({ email });

    // If no user is found, respond with a 404 status
    if (!userDb) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords if user is found
    bcrypt.compare(password, userDb.password, (err, result) => {
      if (result) {
        const token = jwt.sign({ foo: "gaf" }, "gaf");
        res.status(200).json({ message: "Login Successful", token: token });
      } else {
        res.status(401).json({ message: "Wrong credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = userRouter;
