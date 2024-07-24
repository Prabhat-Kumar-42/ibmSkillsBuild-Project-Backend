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

const handleGetAllItems = async (req, res) => {
  const itemList = await Item.find({});
  res.status(200).json(itemList);
};

const handleGetItem = async (req, res) => {
  const id = req.params.itemId;
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
  return res.status(201).json({ message: "created", item });
};

const handleDeleteItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId) throwError(400, "Bad Request");
  const shopId = req.user.shopId;
  const shop = await Shop.findById(shopId);
  if (!shop) throwError(404, "shop not found");
  const item = await Item.findById(itemId);
  if (item.shopId.toString() !== shopId) throwError(403, "Forbidden");
  shop.itemList = shop.itemList.filter(
    (item) => item._id.toString() !== itemId,
  );
  await shop.save();
  await item.deleteOne();
  return res.status(204).end();
};

const handleUpdateItem = async (req, res) => {
  const itemId = req.params.itemId;
  if (!itemId || !req.body) throwError(400, "Bad Request");
  const shopId = req.user.shopId;
  const item = await Item.findById(itemId);
  if (!item) throwError(404, "Not Found");
  if (item.shopId.toString() !== shopId) throwError(403, "Forbidden");
  const { name, category, price, discount, quantity } = req.body;
  if (name) item.name = name;
  if (category) item.category = category;
  if (price) item.price = price;
  if (discount) item.discount = discount;
  if (quantity) item.quantity = quantity;
  await item.save();
  return res.status(200).json({ message: "updated", item });
};

module.exports = {
  handleGetCategory,
  handleGetItem,
  handleCreateItem,
  handleDeleteItem,
  handleUpdateItem,
  handleGetAllItems,
};
