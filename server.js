import mongoose from "mongoose";
const { schema } = mongoose;

const userAccounts = new Schema({
  userName: { String, required: true },
  accountName: String,
  accountDesc: String,
  accountBalance: {
    lastTwoMonth: Number,
    lastMonth: Number,
    thisMonth: Number,
  },
});

const transactionCategories = new Schema({
  tCode: String,
  tCategory: String,
});

const userDetails = new Schema({
  fullName: String,
  email: String,
  userName: String,
  password: String,
  accountName: [String],
});

const transactionDetails = new Schema({
  userName: { String, required: true }, // Should be able to get this from the login
  date: { type: Date, default: Date.now },
  accountName: { String, required: true }, // Important to track money flow
  amount: { Number, required: true }, // If user choose debit, postive. Else negative
  senderName: String,
  recipeintName: String,
  userComments: [{ body: String, date: Date }],
});
