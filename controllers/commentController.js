const commentModel = require("../models/comments");

const postComment = async (req, res) => {
  try {
    const { blogId, user, text } = req.body;

    const commentDoc = await commentModel.create({ blog: blogId, user, text });
    res
      .status(200)
      .json({ message: "Comment uploaded successfully", commentDoc });
    res.json();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error posting comment" });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await commentModel
      .find({ blog: req.params.id })
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch comments", error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.body;

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    const comment = await commentModel.findByIdAndDelete(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete comment", error: err.message });
  }
};

module.exports = { postComment, getComments, deleteComment};
