const TransactionDetails = require("../models/transactionDetailSchema");
const express = require("express");
const seedTransaction = express.Router();

const transactionSeeds = [
  {
    email: "user01@user.com",
    date: 15 - 01 - 2022,
    accountName: "user01Account",
    amount: 100,
    tCategory: "Payment",
    recipeintName: "Recipient 1",
    tDetails: "user01 transaction seed 1",
  },
  {
    email: "user01@user.com",
    date: 16 - 01 - 2022,
    accountName: "user01Account",
    amount: -200,
    tCategory: "Payment",
    recipeintName: "Recipient 2",
    tDetails: "user01 transaction seed 2",
  },
  {
    email: "user02@user.com",
    date: 15 - 01 - 2022,
    accountName: "user02Account",
    amount: 100,
    tCategory: "Payment",
    recipeintName: "Recipient 1",
    tDetails: "user02 transaction seed 1",
  },
  {
    email: "user02@user.com",
    date: 16 - 01 - 2022,
    accountName: "user02Account",
    amount: -200,
    tCategory: "Payment",
    recipeintName: "Recipient 2",
    tDetails: "user02 transaction seed 2",
  },
  {
    email: "user03@user.com",
    date: 15 - 01 - 2022,
    accountName: "user03Account",
    amount: 100,
    tCategory: "Payment",
    recipeintName: "Recipient 1",
    tDetails: "user03 transaction seed 1",
  },
  {
    email: "user03@user.com",
    date: 16 - 01 - 2022,
    accountName: "user02Account",
    amount: -200,
    tCategory: "Payment",
    recipeintName: "Recipient 2",
    tDetails: "user03 transaction seed 2",
  },
];

seedTransaction.get("/seed", async (req, res) => {
  try {
    await TransactionDetails.deleteMany({});
    await TransactionDetails.insertMany(transactionSeeds);
    res.status(200).send("Transactions Seeded");
  } catch (error) {
    console.log(error);
  }
});

module.exports = seedTransaction;
