// Dependencies
const express = require("express");
const transactions = express.Router();
const TransactionDetails = require("../models/transactionDetailSchema");
const UserDetails = require("../models/userDetailSchema");

transactions.get("/", async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const findUser = await UserDetails.find(currentUser);
    res.status(200).send(findUser.accountName);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

transactions.post("/new", async (req, res) => {
  try {
    const newTransaction = await TransactionDetails.create(req.body);
    res
      .status(200)
      .send([
        { msg: "Transaction successfully saved!" },
        { details: newTransaction },
      ]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = transactions;
