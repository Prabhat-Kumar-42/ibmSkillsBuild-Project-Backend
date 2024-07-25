const express = require("express");
const commentRouter = express.Router();
const { checkAuth } = require("../../middlewares/checkAuth.middleware");
const {
  handlePostComment,
  handleUpdateComment,
  handleDeleteComment,
  handleGetTargetComment,
} = require("../../controllers/api/comment.controller");

commentRouter.route("/").post(checkAuth, handlePostComment);
commentRouter
  .route("/:commentId")
  .put(checkAuth, handleUpdateComment)
  .delete(checkAuth, handleDeleteComment);
commentRouter.route("/target/:targetId").get(handleGetTargetComment);

module.exports = {
  commentRouter,
};
