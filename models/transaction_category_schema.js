//Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionCategoriesSchema = new Schema({
  tCategory: { type: String, default: "Expense" },
});

const TransactionCategoriesSchema = mongoose.model(
  "TransactionCategoriesSchema",
  TransactionCategoriesSchema
);

module.exports = TransactionCategoriesSchema;
