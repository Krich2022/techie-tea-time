const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/:id", async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    console.err(err);
    res.status(500).json(err);
  }
});

router.post("/:id", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const commentData = await Comment.create({
      content: req.body.content,
      user_id: userId,
      post_id: req.params.id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.err(err);
    res.status(500).json(err);
  }
});

module.exports = router;
