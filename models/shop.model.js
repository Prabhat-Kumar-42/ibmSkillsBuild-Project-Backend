const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  Category: {
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  stars: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  geoLocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

shopSchema.index({ geoLocation: "2dsphere" });

const Shop = mongoose.model("Shop", shopSchema);

module.exports = {
  Shop,
};
