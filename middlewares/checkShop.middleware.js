const throwError = require("../utility/throwError.util");

const checkShop = (req, res, next) => {
  if (!req.user.shopId) throwError(400, "please create shop to continue");
  next();
};

module.exports = {
  checkShop,
};
