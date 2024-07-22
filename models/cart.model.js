const mongoose = require("mongoose");

const cartSchema = {
  itemList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  Cart,
};
