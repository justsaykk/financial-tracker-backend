// Dependencies
const express = require("express");
const transactions = express.Router();
const TransactionDetails = require("../models/transactionDetailSchema");

transactions.get("/", (req, res) => {
  res.status(200).send({ category: "Payments" });
});

transactions.post("/new", async (req, res) => {
  try {
    // const newTransaction = await TransactionDetails.create(req.body);
    res.status(200).send("Transaction successfully saved!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = transactions;