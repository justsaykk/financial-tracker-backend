const UserDetails = require("../models/user-details");
const express = require("express");
const bcrypt = require("bcrypt");
const seed = express.Router();

const userSeeds = [
  {
    name: "user01",
    email: "user01@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user01Account",
    accountType: "debit",
    accountDescription: "user01AccountDesc",
    accountBalance: 5000,
  },
  {
    name: "user02",
    email: "user02@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user02Account",
    accountType: "debit",
    accountDescription: "user02AccountDesc",
    accountBalance: 6000,
  },
  {
    name: "user03",
    email: "user03@user.com",
    password: bcrypt.hashSync("123", 10),
    accountName: "user03Account",
    accountType: "debit",
    accountDescription: "user03AccountDesc",
    accountBalance: 7000,
  },
];

seed.get("/seed", async (req, res) => {
  try {
    await UserDetails.deleteMany({});
    await UserDetails.insertMany(userSeeds);
    res.status(200).send("Users Seeded");
  } catch (error) {
    console.log(error);
  }
});

module.exports = seed;
