const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const userDetails = require("../models/user-details");
const saltRounds = 10;

users.get("/register", (req, res) => {
  res.send("This is for troubleshooting register page");
});

users.post("/register", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hash;
  try {
    const createdUser = await userDetails.create(req.body);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = users;
