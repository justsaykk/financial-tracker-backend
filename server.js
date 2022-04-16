// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const userController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");
const seedController = require("./controllers/seed_controller");
const transactions = require("./controllers/transaction_controller");

// CONFIG
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI;

// MIDDLEWARE
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://localhost:2000",
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
app.use("/seed", seedController);
app.use("/transactions", transactions);

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
