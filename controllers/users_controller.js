// Dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const userDetailSchema = require("../models/userDetailSchema");
const transactionDetailsSchema = require("../models/transactionDetailSchema");
const saltRounds = 10;

users.post("/register", async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
  try {
    // Finding if email exist in database
    const foundUser = await userDetailSchema.findOne({ email: req.body.email });
    if (!foundUser) {
      const createdUser = await userDetailSchema.create(req.body);
      // Need to perform a one time initial transaction
      const initialTransaction = await transactionDetailsSchema.create({
        email: req.body.email,
        date: new Date(),
        accountName: req.body.accountName,
        amount: req.body.accountBalance,
        tCategory: "Initializing Database",
      });
      // Success message upon user creation
      res.status(200).send({ msg: "User created successfully!" });
    } else {
      res.send({ msg: "You have an existing account with us" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = users;
