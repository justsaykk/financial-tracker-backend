// Dependencies
const express = require("express");
const transactions = express.Router();
const TransactionDetails = require("../models/transactionDetailSchema");
const UserDetails = require("../models/userDetailSchema");

transactions.get("/", async (req, res) => {
  console.log("foundUser is", req.session.foundUser);
  const findUser = await UserDetails.find({ email: "mary@gmail.com" });
  // res.send(findUser)
  res.status(200).send(findUser.accountName);
});

transactions.post("/new", async (req, res) => {
  try {
    const newTransaction = await TransactionDetails.create(req.body);
    res.status(200).send({ msg: "Transaction successfully saved!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = transactions;
