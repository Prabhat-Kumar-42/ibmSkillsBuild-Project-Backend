const { Shop } = require("../../models/shop.model");
const { User } = require("../../models/user.model");
const { generateToken } = require("../../utility/authToken.util");
const throwError = require("../../utility/throwError.util");

// TODO: 1. add a handler to get the enum values of shop category;
// TODO: 2. send auth as headers
// TODO: 3. added shop object in createObject handler, add this in documentation
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
    throwError(
      400,
      "[name, location, category, coordinates] are required fields",
    );
  const shop = await Shop.create({
    name,
    location,
    category,
    ownerId,
    geoLocation: { coordinates },
  });
  user.shopId = shop._id;
  await user.save();
  const authToken = generateToken(user);
  return res.status(201).json({
    message: "created",
    authorization: { scheme: "Bearer", authToken },
    shop,
  });
};

const handleDeleteShop = async (req, res) => {
  const shopId = req.params.shopId;
  if (!shopId) throwError(400, "Bad Request");
  const requestingUser = req.user;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "Not Found");
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
  if (!shop) throwError(404, "Not Found");
  if (shop.ownerId.toString() !== requestingUser.id)
    throwError(403, "Forbidden");
  const { name, location, category, coordinates } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (location !== undefined) updates.location = location;
  if (category !== undefined) updates.category = category;
  if (coordinates !== undefined) {
    updates.geoLocation = { coordinates };
  }
  const updatedShop = await Shop.findByIdAndUpdate(shopId, updates, {
    runValidators: true,
    new: true,
  });
  return res.status(200).json(updatedShop);
};

const addItemToShopList = async (req, res) => {
  if (!req.body) throwError(400, "Bad Request");
  const shopId = req.params.shopId;
  const requestingUser = req.user;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "Not Found");
  if (shop.ownerId.toString() !== requestingUser.id)
    throwError(403, "Forbidden");
  const itemList = req.body.itemList;
  itemList.forEach((item) => shop.itemList.push(item));
  await shop.save();
  return res.status(201).json(shop);
};

module.exports = {
  handleGetAllShops,
  handleGetShop,
  handleCreateShop,
  handleDeleteShop,
  handleUpdateShop,
  addItemToShopList,
};
