const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const UserDetails = require("../models/user-details");
const saltRounds = 10;

users.get("/register", (req, res) => {
  res.send("This is for troubleshooting register page");
});

users.post("/register", async (req, res) => {
  const userInputPassword = req.body.password;
  const hash = bcrypt.hashSync(userInputPassword, saltRounds);
  req.body.password = hash;
  console.log("req.body is", req.body);
  try {
    const createdUser = await UserDetails.create(req.body);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = users;
