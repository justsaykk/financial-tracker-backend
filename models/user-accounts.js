import mongoose from "mongoose";
const { Schema } = mongoose;

const userAccounts = new Schema([
  {
    accountName: { String, required: true },
    accountDescription: String,
    accountBalance: { type: Number, required: true },
  },
]);

module.exports = mongoose.model("UserAccount", userAccounts);
