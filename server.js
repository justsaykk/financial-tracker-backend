// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const userController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");
const transactions = require("./controllers/transaction_controller");

// Seed Controllers
const seedUsers_Controller = require("./controllers/seedUsers_controller");
const seedTransaction_Controller = require("./controllers/seedTransaction_controller");

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

// MIDDLEWARE
app.use(
  cors({
    credentials: true,
    origin: [
      "https://localhost:3000",
      "https://localhost:2000",
      "https://localhost:4000",
      "https://moneybank.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use("/new", userController);
app.use("/dashboard", sessionsController);
app.use("/transactions", transactions);

// Seed Middleware
app.use("/seedusers", seedUsers_Controller);
app.use("/seedtransactions", seedTransaction_Controller);

// Server Connection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " Mongod is not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGO, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});

// Listener
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
