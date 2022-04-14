const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const UserDetails = require("../models/user-details");
const saltRounds = 10;

users.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  try {
    const createdUser = await UserDetails.create(req.body);
    res.status(200).send("created user: " + createdUser);
    console.log();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = users;
