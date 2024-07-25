const { Cart } = require("../../models/cart.model");
const { User } = require("../../models/user.model");
const { getCartDetails } = require("../../utility/cartDetails.util");
const throwError = require("../../utility/throwError.util");

//TODO: cart delete on user delete
//TODO: shop delete on user delete

const handleGetCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await getCartDetails(userId);
  if (!cart) {
    const user = await User.findById(userId);
    if (!user) throwError(404, "user not found");
    const newCart = await Cart.create({ user: user.id });
    user.cartId = newCart.id;
    await user.save();
    return res.status(200).json({ message: "created", cart });
  }
  return res.status(200).json({ message: "success", cart });
};

const handleUpdateCart = async (req, res) => {
  const userId = req.user.id;
  if (!req.body || !req.body.itemList) throwError(400, "Bad Request");
  const cart = await getCartDetails(userId);
  if (!cart) throwError(404, "Not Found");
  cart.itemList = req.body.itemList;
  await cart.save();
  return res.status(200).json({ message: "updated", cart });
};

const handleDeleteCart = async (req, res) => {
  const userId = req.user.id;
  await Cart.deleteOne({ uesr: userId });
  return res.status(204).end();
};

module.exports = {
  handleGetCart,
  handleUpdateCart,
  handleDeleteCart,
};
