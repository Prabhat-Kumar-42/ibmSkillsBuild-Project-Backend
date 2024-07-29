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
  .post(checkAuth, checkShop, handleCreateItem);

itemRouter.route("/categories").get(handleGetCategory);

itemRouter
  .route("/:itemId")
  .get(handleGetItem)
  .delete(checkAuth, checkShop, handleDeleteItem)
  .put(checkAuth, checkShop, handleUpdateItem);

module.exports = { itemRouter };
