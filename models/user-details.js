// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("UserDetails", userDetailsSchema);
