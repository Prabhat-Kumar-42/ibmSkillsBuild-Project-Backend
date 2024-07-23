const express = require("express");
const userRouter = express.Router();
const { checkAuth } = require("../../middlewares/checkAuth.middleware");
const {
  handleUserLogin,
  handleUserSignUp,
  handleGetUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateEmail,
  handleUpdatePassword,
} = require("../../controllers/api/user.controller");

userRouter
  .route("/")
  .get(handleGetUser)
  .delete(checkAuth, handleDeleteUser)
  .put(checkAuth, handleUpdateUser);

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignUp);

userRouter.route("/update-email").post(checkAuth, handleUpdateEmail);
userRouter.route("/update-password").post(checkAuth, handleUpdatePassword);

module.exports = { userRouter };
