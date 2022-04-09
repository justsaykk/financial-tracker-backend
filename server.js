// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userDetails = require("./models/user-details.js");

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// Server Connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGO, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// Routes
app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/moneybank/register", (req, res) => {
  res.send("You are at moneybank/register");
});

app.post("/moneybank/register", async (req, res) => {
  try {
    const createdUser = await userDetails.create(req.body);
    res.send(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listener
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
