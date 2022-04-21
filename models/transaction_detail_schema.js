// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionDetails = new Schema({
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  accountName: { type: String, default: "N/A" },
  amount: { type: Number, required: true },
  tCategory: { type: String, default: "N/A" },
  recipientName: { type: String, default: "N/A" },
  sender: { type: String, default: "N/A" },
  tDetails: { type: String, default: "N/A" },
});

const TransactionDetails = mongoose.model(
  "TransactionDetails",
  transactionDetails
);

module.exports = TransactionDetails;
