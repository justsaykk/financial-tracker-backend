import mongoose from "mongoose";
const { schema } = mongoose;

const userDetails = new Schema({
  fullName: String,
  email: String,
  userName: String,
  password: String,
  accountName: [String],
});

module.exports = userDetails;
