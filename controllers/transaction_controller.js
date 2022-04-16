// Dependencies
const express = require("express");
const transactions = express.Router();
const TransactionDetails = require("../models/transactionDetailSchema");

transactions.get("/", (req, res) => {
  res.status(200).send([{ account: "Account1" }]);
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
