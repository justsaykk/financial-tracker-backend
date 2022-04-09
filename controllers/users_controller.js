const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const userDetails = require("../models/user-details");

// users.get("/new", (req, res) => {
//   res.render("users/new.ejs");
// });

// users.get("/new", (req, res) => {
//   res.send("This is the new user registration page");
// });

users.post("/register", async (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await userDetails.create(req.body);
    console.log("created user is: ", createdUser);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = users;
