// DEPENDENCIES
const express = require("express");
// const session = require("express-session");

// CONFIG
const app = express();
const PORT = 3000;

// MIDDLEWARE
// app.use(
//   session({
//     secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
//     resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
//     saveUninitialized: false, // default  more info: https://www.npmjs.com/package/express-session#resave
//   })
// );

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
