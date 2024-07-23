const express = require("express");
const itemRouter = express.Router();

const { checkShop } = require("../../middlewares/checkShop.middleware");
const { checkAuth } = require("../../middlewares/checkAuth.middleware");
const {
  handleGetAllItems,
  handleGetItem,
  handleCreateItem,
  handleUpdateItem,
  handleDeleteItem,
  handleGetCategory,
} = require("../../controllers/api/item.controller");

itemRouter
  .route("/")
  .get(handleGetAllItems)
  .post(checkAuth, checkShop, handleCreateItem)
  .put(checkAuth, checkShop, handleUpdateItem)
  .delete(checkAuth, checkShop, handleDeleteItem);

itemRouter.route("/:itemId").get(handleGetItem);

itemRouter.route("/categories").get(handleGetCategory);

module.exports = { itemRouter };
