import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionCategories = new Schema({
  tCode: String,
  tCategory: String,
});

module.exports = transactionCategories;
