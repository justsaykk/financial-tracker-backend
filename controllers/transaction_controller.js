// Dependencies
const express = require("express");
const transactions = express.Router();
const methodOverride = require("method-override");
const TransactionDetails = require("../models/transaction_detail_schema");

//Middleware
transactions.use(methodOverride("_method"));

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.status(401).send({ error: "unauthorized" });
  }
};

transactions.get("/", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const transactionData = await TransactionDetails.find({
      email: currentUser.email,
    });
    res.status(200).send(transactionData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

transactions.post("/new", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  const body = req.body;
  try {
    if (body.account !== currentUser.accountName) {
      body.amount = body.amount * -1;
    }
    console.log(currentUser.email);
    const newTransaction = await TransactionDetails.create({
      email: currentUser.email,
      date: body.date,
      accountName: body.account,
      amount: body.amount,
      reciepientName: body.recipient,
      tDetails: body.transaction,
    });
    res
      .status(200)
      .send([
        { msg: "Transaction successfully saved!" },
        { details: newTransaction },
      ]);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

transactions.delete("/:id", isAuth, async (req, res) => {
  try {
    const removeTransaction = await TransactionDetails.findByIdAndRemove(
      req.params.id
    );
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = transactions;
