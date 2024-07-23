const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Grocery",
      "Clothing",
      "Electronics",
      "Books",
      "Furniture",
      "Toys",
      "Sports",
      "Jewelry",
      "Chemist",
      "Other",
    ],
    required: true,
  },
  price: {
    type: Number,
    default: 0,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  ratings: {
    type: Number,
    defaut: 0,
  },
  imgUrl: {
    type: String,
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
  },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = {
  Item,
};
