require('dotenv').config();

const app = require("./app");
const mongoose = require('mongoose');
const connectDB = require('./db/connectDB');

const { DB_URI, PORT } = process.env;

// IIFE
(async () => {
  await connectDB(DB_URI);
  console.log("DB connection succes");

  app.listen(PORT, () => {
    console.log("Server is runing");
  });
})();