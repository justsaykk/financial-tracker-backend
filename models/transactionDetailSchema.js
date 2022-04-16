// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionDetails = new Schema({
  email: { type: String, required: true }, // Should be able to get this from the login
  date: { type: Date, default: Date.now }, // To bucket the balance
  accountName: String, // Important to track money flow
  amount: { type: Number, required: true }, // If user choose debit, postive. Else negative
  tCategory: String, // Optional, only for data analysis and categorization
  recipeintName: String, // Optional, only for data analysis and categorization
  tDetails: [{ body: String, date: Date }], // Optional, only for data analysis and categorization
});

const TransactionDetails = mongoose.model(
  "TransactionDetails",
  transactionDetails
);

module.exports = TransactionDetails;
