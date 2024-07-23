const express = require("express");
const shopRouter = express.Router();

const { checkAuth } = require("../../middlewares/checkAuth.middleware");
const {
  handleGetAllShops,
  handleCreateShop,
  handleGetShop,
  handleUpdateShop,
  handleDeleteShop,
  addItemToShopList,
} = require("../../controllers/api/shop.controller");

shopRouter.route("/").get(handleGetAllShops).post(checkAuth, handleCreateShop);
shopRouter
  .route("/:shopId")
  .get(handleGetShop)
  .put(checkAuth, handleUpdateShop)
  .delete(checkAuth, handleDeleteShop);
shopRouter.route("/:shopId/addItem").put(checkAuth, addItemToShopList);

module.exports = { shopRouter };
