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

// Get route for all transactions
transactions.get("/", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const transactionData = await TransactionDetails.find({
      email: currentUser.email,
    }).lean();
    const convertedData = transactionData.map((el) => {
      const newDate = el.date.toISOString().substring(0, 10);
      return { ...el, date: newDate };
    });
    res.status(200).send(convertedData);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get specific transaction (by ID) route
transactions.get("/:id", isAuth, async (req, res) => {
  const id = req.params.id;
  try {
    const transactionData = await TransactionDetails.findById(id).lean();
    const newDate = transactionData.date.toISOString().substring(0, 10);
    res.status(200).send({ ...transactionData, date: newDate });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Create new transaction route
transactions.post("/new", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  const body = req.body;
  try {
    if (body.category !== "Income") {
      body.amount = body.amount * -1;
    }
    const newTransaction = await TransactionDetails.create({
      email: currentUser.email,
      date: new Date(body.date),
      accountName: body.account,
      amount: body.amount,
      recipientName: body.recipient,
      sender: body.sender,
      tCategory: body.category,
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

// Delete route
transactions.delete("/:id", isAuth, async (req, res) => {
  try {
    const removeTransaction = await TransactionDetails.findByIdAndRemove(
      req.params.id
    );
    res.status(200).send({
      msg: `${removeTransaction} has been deleted from database`,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Update Route
transactions.put("/:id", isAuth, async (req, res) => {
  const transactionId = { _id: req.params.id };
  const body = req.body;
  const updatedFields = {
    date: new Date(body.date),
    amount: body.amount,
    sender: body.sender,
    recipientName: body.recipient,
    tDetails: body.transaction,
  };
  try {
    const updatedTransaction = await TransactionDetails.findByIdAndUpdate(
      transactionId,
      updatedFields
    );
    res
      .status(200)
      .send([
        { msg: "updated transaction successfully!" },
        { transaction: updatedTransaction },
      ]);
  } catch (error) {
    res
      .status(404)
      .send({ msg: `Error with the 'put' route: ${error.message}` });
  }
});

module.exports = transactions;
