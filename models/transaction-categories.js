import mongoose from "mongoose";
const { schema } = mongoose;

const transactionCategories = new Schema({
  tCode: String,
  tCategory: String,
});
