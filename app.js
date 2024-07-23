require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");

const { userRouter } = require("./router/api/user.route");
const { shopRouter } = require("./router/api/shop.route");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
const {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
} = require("./middlewares/errorHandlers.middleware");

//Routes
app.use("/api/user/", userRouter);
app.use("/api/shop/", shopRouter);

// Error Handler
app.use(unknownEndpoint);
app.use(mongoError);
app.use(jwtError);
app.use(errorHandler);

module.exports = {
  app,
};
