const express = require("express");
const dotenv = require("dotenv");
const connection = require("./db");
const userRouter = require("./routes/userRoute");
dotenv.config();

const port = process.env.PORT; //

const app = express(); // server created
app.use(express.json())
app.use("/users", userRouter)

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Server" });
});
app.get("/about", (req, res) => {
  res.json({ message: "Welcome to About page" });
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port: ${8080}`);
  } catch (error) {
    console.log(`error: ${error}`);
  }
});
