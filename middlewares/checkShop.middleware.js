const throwError = require("../utility/throwError.util");

const checkShop = (req, res, next) => {
  if (!req.user.shopId) throwError(400, "invalid token");
  next();
};

module.exports = {
  checkShop,
};
