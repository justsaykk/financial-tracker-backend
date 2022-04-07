import mongoose from "mongoose";
const { schema } = mongoose;

const userDetailsSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

module.exports = mongoose.model("UserDetails", userDetailsSchema);
