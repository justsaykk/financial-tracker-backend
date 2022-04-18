// Dependencies
const express = require("express");
const transactions = express.Router();
const TransactionDetails = require("../models/transactionDetailSchema");
const UserDetails = require("../models/userDetailSchema");

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
  }
};

transactions.get("/", isAuth, async (req, res) => {
  try {
    const currentUser = req.session.currentUser;
    const findUser = await UserDetails.find(currentUser);
    res.status(200).send(findUser.accountName);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

transactions.post("/new", isAuth, async (req, res) => {
  try {
    if (req.body.account !== req.session.currentUser.accountName) {
      req.body.amount = req.body.amount * -1;
    }

    const newTransaction = await TransactionDetails.create({
      email: req.session.currentUser,
      date: req.body.date,
      accountName: req.body.account,
      amount: req.body.amount,
      reciepientName: req.body.recipient,
      tDetails: req.body.transactionDetails,
    });
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
