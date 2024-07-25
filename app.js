require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");

const { userRouter } = require("./router/api/user.route");
const { shopRouter } = require("./router/api/shop.route");
const { itemRouter } = require("./router/api/item.route");
const { cartRouter } = require("./router/api/cart.route");
const { commentRouter } = require("./router/api/comment.route");

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  unknownEndpoint,
  mongoError,
  jwtError,
  errorHandler,
} = require("./middlewares/errorHandlers.middleware");

//Routes
app.use("/api/user/", userRouter);
app.use("/api/shop/", shopRouter);
app.use("/api/item/", itemRouter);
app.use("/api/cart/", cartRouter);
app.use("/api/comment/", commentRouter);

// Error Handler
app.use(unknownEndpoint);
app.use(mongoError);
app.use(jwtError);
app.use(errorHandler);

module.exports = {
  app,
};
