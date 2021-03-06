// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountName: [{ type: String, required: true }],
  accountType: { type: String, required: true },
  accountDescription: String,
  accountBalance: { type: Number, required: true },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
