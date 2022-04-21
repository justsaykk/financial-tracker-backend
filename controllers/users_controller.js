// Dependencies
const express = require("express");
const user = express.Router();
const UserDetails = require("../models/user_detail_schema");

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res.status(401).send({ error: "unauthorized" });
  }
};

user.get("/", isAuth, async (req, res) => {
  const currentUser = req.session.currentUser;
  try {
    const userData = await UserDetails.findOne({ email: currentUser.email });
    res.status(200).send(userData);
  } catch (error) {
    res.status.send("Error at user.get route");
  }
});

module.exports = user;
