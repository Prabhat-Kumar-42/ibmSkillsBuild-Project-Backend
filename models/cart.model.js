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
