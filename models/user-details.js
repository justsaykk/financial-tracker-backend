// Dependencies
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetailsSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
});

module.exports = mongoose.model("UserDetails", userDetailsSchema);
