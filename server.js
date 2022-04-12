// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
// const bcrypt = require("bcrypt");
const userDetails = require("./models/user-details.js");
const userController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

const whitelist = ["https://moneybank.vercel.app"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/new", userController);
app.use("/", sessionsController);

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
app.get("/dashboard", (req, res) => {
  res.send("This is the dashboard page");
});

// Listener
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
