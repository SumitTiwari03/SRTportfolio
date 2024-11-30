const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const Connection = mongoose.connect(
  `mongodb+srv://Sumit0309:${process.env.MONGODB_PASSWORD}@cluster0.puuiszq.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0`
);

module.exports = Connection;
