const mongoose = require("mongoose");
const { info } = require("../utility/logger.util");

const mongoUrl = process.env.MONGO_URL;

const mongoConnect = async () => {
  await mongoose.connect(mongoUrl);
  info("Connected To Database Successfully");
};

module.exports = mongoConnect;
