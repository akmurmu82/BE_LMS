const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const UserModel = require("../models/userModel");

const userRouter = express.Router();

// Register route
userRouter.post("/register", (req, res) => {
  const { name, password, email, mobileNo } = req.body;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const newUser = await UserModel({
        name,
        password: hash,
        email,
        mobileNo,
      });
      newUser.save();
    });
    res.status(201).json({ message: "new user has been created" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  const { password, email, mobileNo } = req.body;
  const userDb = await UserModel.findOne({ email }||{mobileNo});
  try {
    bcrypt.compare(password, userDb.password, function (err, result) {
      // result == true
      if (result) {
        const token = jwt.sign({ foo: 'bar' }, 'lms');
        res.status(200).json({ message: "login succesfull", token: token });
      } else {
        res.status(404).json({ message: "User not found/wrong credential" });
      }
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = userRouter;
