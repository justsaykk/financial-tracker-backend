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

module.exports = userAccounts;
