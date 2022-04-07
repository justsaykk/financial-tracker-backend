// DEPENDENCIES
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const whitelist = [
  "http://localhost:3000",
  "https://fathomless-sierra-68956.herokuapp.com",
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

// MIDDLEWARE
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/moneybank/register", (req, res) => {
  console.log("Create route accessed!");
  res.send("This route works");
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
