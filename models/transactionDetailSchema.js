// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionDetails = new Schema({
  // Should be able to get this from the login
  email: { type: String, required: true },
  // To bucket the balance
  date: { type: Date, default: Date.now },
  // Important to track money flow
  accountName: String,
  // If user choose debit, postive. Else negative
  amount: { type: Number, required: true },
  // Optional, only for data analysis and categorization
  tCategory: String,
  recipeintName: String,
  tDetails: String,
});

const TransactionDetails = mongoose.model(
  "TransactionDetails",
  transactionDetails
);

module.exports = TransactionDetails;
