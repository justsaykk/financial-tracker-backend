// DEPENDENCIES
require("dotenv").config();
const express = require("express");

// CONFIG
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
