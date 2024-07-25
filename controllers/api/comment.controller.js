const { Comment } = require("../../models/comment.model");
const throwError = require("../../utility/throwError.util");

const handleGetTargetComment = async (req, res) => {
  const targetId = req.params.targetId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const comments = await Comment.find({ target: targetId })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user")
    .populate("replies");
  res.status(200).json(comments);
};

const handlePostComment = async (req, res) => {
  const user = req.user.id;
  const { content, target } = req.body;
  const newComment = new Comment({
    content,
    user,
    target,
  });
  // TODO: increase target replies count: add this task  to queue, will implement in future;
  const savedComment = await newComment.save();
  res.status(201).json({ message: "created", comment: savedComment });
};

const handleUpdateComment = async (req, res) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;
  const { content, likes, dislikes } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) throwError(404, "commnet not found");
  if (content) {
    if (comment.user.toString() !== userId) {
      throwError(403, "Forbidded");
    }
    comment.content = content;
  }
  if (likes) comment.likes = likes;
  if (dislikes) comment.dislikes = dislikes;
  await comment.save();
  const updatedComment = await comment.populate();
  return res.status(200).json({ message: "success", comment: updatedComment });
};

const handleDeleteComment = async (req, res) => {
  const userId = req.user.id;
  const commentId = req.params.commentId;
  const comment = await Comment.findById(commentId);
  if (!comment) throwError(404, "commnet not found");
  if (comment.user.toString() !== userId) throwError(403, "Forbidded");
  await comment.deleteOne();
  return res.status(204).end();
};

module.exports = {
  handleGetTargetComment,
  handlePostComment,
  handleUpdateComment,
  handleDeleteComment,
};
