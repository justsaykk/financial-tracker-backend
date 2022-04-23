const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const userDetailSchema = require("../models/user_detail_schema");
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

// Login Route
sessions.post("/", async (req, res) => {
  try {
    const foundUser = await userDetailSchema.findOne({ email: req.body.email });
    if (!foundUser) {
      res.send({ msg: "user not found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        req.session.isLoggedIn = true;
        res.status(200).send(foundUser);
      } else {
        res.send({ msg: "Wrong Password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout Route
sessions.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).send({ msg: "unable to logout" });
      } else {
        res.send({ msg: "logout successfully" });
      }
    });
  } else {
    res.end();
  }
});

module.exports = sessions;
