// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const whitelist = [
  "http://localhost:3000",
  "https://moneybankbackend.herokuapp.com/",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

// MIDDLEWARE
app.use(cors(corsOptions));
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

app.post("/moneybank/register", (req, res) => {
  console.log("Create route accessed!");
  res.send("This route works");
});

// Listener
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
