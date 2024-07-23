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
  .delete(checkAuth, handleDeleteUser)
  .put(checkAuth, handleUpdateUser);

userRouter.route("/:id").get(handleGetUser);

userRouter.route("/login").post(handleUserLogin);
userRouter.route("/signup").post(handleUserSignUp);

userRouter.route("/update-email").put(checkAuth, handleUpdateEmail);
userRouter.route("/update-password").put(checkAuth, handleUpdatePassword);

module.exports = { userRouter };
