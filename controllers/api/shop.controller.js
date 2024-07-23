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
    geoLocation: { coordinates },
  });
  user.shopId = shop._id;
  await user.save();
  return res.status(201).json({ message: "created" });
};

const handleDeleteShop = async (req, res) => {
  const shopId = req.params.shopId;
  if (!shopId) throwError(400, "Bad Request");
  const requestingUser = req.user;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(400, "Bad Request");
  if (shop.ownerId.toString() !== requestingUser.id)
    throwError(403, "Forbidden");
  const user = await User.findById(requestingUser.id);
  user.shopId = null;
  await user.save();
  await Shop.findByIdAndDelete(shopId);
  return res.status(204).end();
};

const handleUpdateShop = async (req, res) => {
  if (!req.body) throwError(400, "Bad Request");
  const shopId = req.params.shopId;
  const requestingUser = req.user;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(400, "Bad Request");
  if (shop.ownerId.toString() !== requestingUser.id)
    throwError(403, "Forbidden");
  const { name, location, category, coordinates } = req.body;
  const updatedShop = await Shop.findByIdAndUpdate(
    shopId,
    {
      name,
      location,
      category,
      geoLocation: { coordinates },
    },
    { runValidators: true, new: true },
  );
  return res.status(204).json(updatedShop);
};

module.exports = {
  handleGetAllShops,
  handleGetShop,
  handleCreateShop,
  handleDeleteShop,
  handleUpdateShop,
};
