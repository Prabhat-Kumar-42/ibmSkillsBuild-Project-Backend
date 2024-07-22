require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
} = require("./middlewares/errorHandlers.middleware");

// Error Handler
app.use(unknownEndpoint);
app.use(mongoError);
app.use(jwtError);
app.use(errorHandler);

module.exports = {
  app,
};
