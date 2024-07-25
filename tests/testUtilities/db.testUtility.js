const { Comment } = require("../../models/comment.model");
const { Item } = require("../../models/item.model");
const { Shop } = require("../../models/shop.model");
const { User } = require("../../models/user.model");
const { commentSampleData } = require("./mockData/commentSampleData");
const { itemSampleData } = require("./mockData/itemSampleData");
const { shopSampleData } = require("./mockData/shopSampleData");
const { userSampleData } = require("./mockData/userSampleData");

const getMockDataList = (modelName) => {
  switch (modelName) {
    case "User":
      return userSampleData;
    case "Shop":
      return shopSampleData;
    case "Item":
      return itemSampleData;
    case "Comment":
      return commentSampleData;
  }
};

const getModel = (modelName) => {
  switch (modelName) {
    case "User":
      return User;
    case "Shop":
      return Shop;
    case "Item":
      return Item;
    case "Comment":
      return Comment;
  }
};

const nonExistingId = async (modelName) => {
  const mockBlogsList = getMockDataList(modelName);
  const Model = getModel(modelName);
  const document = new Model(mockBlogsList[0]);
  document.save();
  await document.deleteOne();
  return document._id.toString();
};

const dataInDB = async (modelName) => {
  const Model = getModel(modelName);
  const documents = await Model.find({});
  return documents.map((document) => document.toJSON());
};

module.exports = {
  getMockDataList,
  nonExistingId,
  dataInDB,
};
