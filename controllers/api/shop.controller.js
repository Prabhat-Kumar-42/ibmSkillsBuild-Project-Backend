const { Shop } = require("../../models/shop.model");
const { User } = require("../../models/user.model");
const throwError = require("../../utility/throwError.util");

const handleGetAllShops = async (req, res) => {
  const shopsList = await Shop.find({});
  return res.status(200).json(shopsList);
};

const handleGetShop = async (req, res) => {
  const shopId = req.params.shopId;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "Not Found");
  return res.status(200).json(shop);
};

const handleCreateShop = async (req, res) => {
  if (!req.body) throwError(400, "all fields are requierd");
  const ownerId = req.user.id;
  const user = await User.findById(ownerId);
  if (!user) throwError(404, "Not Found");
  const { name, location, category, coordinates } = req.body;
  if (!name || !location || !category || !coordinates)
    throwError(400, "all marked fields are required");
  const shop = await Shop.create({
    name,
    location,
    category,
    ownerId,
    coordinates,
  });
  user.shopId = shop._id;
  await user.save();
  return res.status(201).json({ message: "created" });
};

module.exports = {
  handleGetAllShops,
  handleGetShop,
  handleCreateShop,
};
