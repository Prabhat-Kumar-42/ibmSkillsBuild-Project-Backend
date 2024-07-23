require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();

//Middlewares
const cors = require("cors");
const {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
} = require("./middlewares/errorHandlers.middleware");
const { userRouter } = require("./router/api/user.route");

//Routes
app.use("/api/user/", userRouter);

// Error Handler
app.use(unknownEndpoint);
app.use(mongoError);
app.use(jwtError);
app.use(errorHandler);

module.exports = {
  app,
};
