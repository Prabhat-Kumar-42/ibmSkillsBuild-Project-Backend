const express = require("express");
const cartRouter = express.Router();

const { checkAuth } = require("../../middlewares/checkAuth.middleware");
const {
  handleGetCart,
  handleUpdateCart,
  handleDeleteCart,
} = require("../../controllers/api/cart.controller");

cartRouter
  .route("/")
  .get(checkAuth, handleGetCart)
  .put(checkAuth, handleUpdateCart)
  .delete(checkAuth, handleDeleteCart);

cartRouter.route("/cartDetails").get();

module.exports = {
  cartRouter,
};
