// Dependencies
const express = require("express");
const router = express.Router();
const UserDetails = require("../models/user-details");

UserDetails.post("/", async (req, res) => {
  try {
    const createdUser = await UserDetails.create(req.body);
    res.status(200).send(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
