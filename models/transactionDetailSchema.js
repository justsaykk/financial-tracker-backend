// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionDetails = new Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  accountName: String,
  amount: { type: Number, required: true },
  tCategory: String,
  recipeintName: String,
  tDetails: String,
});

const TransactionDetails = mongoose.model(
  "TransactionDetails",
  transactionDetails
);

module.exports = TransactionDetails;
