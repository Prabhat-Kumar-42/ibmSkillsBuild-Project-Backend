const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  itemList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  total: {
    type: Number,
    default: 0,
  },
});

cartSchema.pre("save", async function (next) {
  const cart = this;
  if (!cart.isModified("itemList")) return next();
  await cart.populate("itemList");
  const total = cart.itemList.reduce((acc, item) => acc + item.finalPrice, 0);
  cart.total = total;
  next();
});

cartSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = {
  Cart,
};
