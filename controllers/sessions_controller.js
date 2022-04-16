const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const UserDetails = require("../models/user-details");
const codes = require("http-status-codes");
const { StatusCodes, getReasonPhrase } = codes;

const isAuth = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return next();
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ error: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
  }
};

sessions.get("/secret", isAuth, (req, res) => {
  res.send("You are logged in");
});

sessions.post("/", async (req, res) => {
  try {
    const foundUser = await UserDetails.findOne({ email: req.body.email });
    if (!foundUser) {
      res.send("No such user");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser.email;
        req.session.isLoggedIn = true;
        res.status(200).send(foundUser.email + " is logged in!");
      } else {
        res.send("Wrong Password");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// sessions.delete("/", (req, res) => {
//   req.session.destroy(() => {
//     // res.redirect("/");
//   });
// });

module.exports = sessions;
