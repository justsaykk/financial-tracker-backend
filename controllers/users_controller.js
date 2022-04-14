const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const UserDetails = require("../models/user-details");
const saltRounds = 10;

users.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  try {
    const createdUser = await UserDetails.create(req.body);
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

module.exports = users;
