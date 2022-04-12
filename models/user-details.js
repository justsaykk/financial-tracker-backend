// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

module.exports = UserDetails;
