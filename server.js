import mongoose from "mongoose";
const { schema } = mongoose;

const userAccounts = new Schema({
  userName: { String, required: true },
  accountName: [{ String, required: true }],
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
  date: { type: Date, default: Date.now }, // To bucket the balance
  accountName: { String, required: true }, // Important to track money flow
  flow: { type: Boolean, required: true }, // true = debit, false = credit
  amount: { Number, required: true }, // If user choose debit, postive. Else negative
  tCategory: String, // Optional, only for data analysis and categorization
  senderName: String, // Optional, only for data analysis and categorization
  recipeintName: String, // Optional, only for data analysis and categorization
  userComments: [{ body: String, date: Date }], // Optional, only for data analysis and categorization
});
