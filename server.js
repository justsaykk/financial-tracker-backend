// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const userController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");
const UserDetails = require("./models/user-details");
const bcrypt = require("bcrypt");

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/new", userController);
app.use("/dashboard", sessionsController);

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

const userSeeds = [
  {
    name: "user01",
    email: "user01@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user01Account",
    accountType: "debit",
    accountDescription: "user01AccountDesc",
    accountBalance: 5000,
  },
  {
    name: "user02",
    email: "user02@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user02Account",
    accountType: "debit",
    accountDescription: "user02AccountDesc",
    accountBalance: 6000,
  },
  {
    name: "user03",
    email: "user03@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user03Account",
    accountType: "debit",
    accountDescription: "user03AccountDesc",
    accountBalance: 7000,
  },
];

app.get("/seed", async (req, res) => {
  try {
    await UserDetails.deleteMany({});
    await UserDetails.insertMany(userSeeds);
    res.status(200).send("Users Seeded");
  } catch (error) {
    console.log(error);
  }
});
