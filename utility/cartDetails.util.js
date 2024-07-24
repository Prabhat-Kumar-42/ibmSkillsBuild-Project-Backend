const _ = require("lodash");
const { Cart } = require("../models/cart.model");

const getCartDetails = async (userId) => {
  const cart = await Cart.find({ user: userId })
    .populate("itemList")
    .populate("user");
  return cart;
};

const getListFinalPrices = (list) => {
  const itemList = _.cloneDeep(list);
  let total = 0;
  for (let item of itemList) {
    item.finalPrice = item.price * (1 - item.discount / 100);
    total += item.finalPrice;
  }
  return { itemList, total };
};

module.exports = {
  getCartDetails,
  getListFinalPrices,
};
