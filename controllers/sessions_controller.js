const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/user-details");

sessions.post("/", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    console.log("I've found this user: ", foundUser);
    if (!foundUser) {
      res.send("No such user");
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log(foundUser.email, " is logged in!");
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
