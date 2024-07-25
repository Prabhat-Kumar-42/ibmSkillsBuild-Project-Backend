const _ = require("lodash");
const { Cart } = require("../models/cart.model");

const getCartDetails = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("itemList")
    .populate("user");
  return cart;
};

module.exports = {
  getCartDetails,
};
