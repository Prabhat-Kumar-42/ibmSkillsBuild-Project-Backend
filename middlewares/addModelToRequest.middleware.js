const addUserModelToRequest = (req, res, next) => {
  req.model = "User";
  next();
};

const addShopModelToRequest = (req, res, next) => {
  req.model = "Shop";
  next();
};
const addItemModelToRequest = (req, res, next) => {
  req.model = "Item";
  next();
};

module.exports = {
  addUserModelToRequest,
  addItemModelToRequest,
  addShopModelToRequest,
};
