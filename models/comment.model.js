const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: Number,
    defaut: 0,
  },
  dislikes: {
    type: Number,
    defaut: 0,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Comment,
};
