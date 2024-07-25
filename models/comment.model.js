const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
      type: Number,
    },
  ],
});

commentSchema.set("toJSON", {
  transform: (document, returnObj) => {
    returnObj.id = returnObj._id.toString();
    delete returnObj._id;
    delete returnObj.__v;
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = {
  Comment,
};
