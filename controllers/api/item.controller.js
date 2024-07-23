const { Item } = require("../../models/item.model");
const { Shop } = require("../../models/shop.model");
const throwError = require("../../utility/throwError.util");

const handleGetCategory = (req, res) => {
  const category = [
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
  ];
  return res.status(200).json(category);
};

const handleGetItem = async (req, res) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  if (!item) throwError(404, "Not Found");
  return res.status(200).json(item);
};

const handleCreateItem = async (req, res) => {
  const shopId = req.user.shopId;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "shop not found");
  const { name, category, price, discount, quantity } = req.body;
  const item = await Item.create({
    name,
    category,
    price,
    discount,
    quantity,
    shopId,
  });
  shop.itemList.push(item._id);
  await shop.save();
  return res.status(201).json({ message: "created" });
};

const handleDeleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId) throwError(400, "Bad Request");
  const shopId = req.user.shopId;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "shop not found");
  shop.itemList = shop.itemList.filter(
    (item) => item._id.toString() !== itemId,
  );
  await shop.save();
  await Item.findByIdAndDelete(itemId);
  return res.status(204).end();
};

const handleUpdateItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId || !req.body) throwError(400, "Bad Request");
  const { name, category, price, discount, quantity } = req.body;
  const item = await Item.findByIdAndUpdate(
    itemId,
    { name, category, price, discount, quantity },
    { runValidators: true, new: true },
  );
  if (!item) throwError(404, "Not Found");
  return res.status(200).end();
};

module.exports = {
  handleGetCategory,
  handleGetItem,
  handleCreateItem,
  handleDeleteItem,
  handleUpdateItem,
};
