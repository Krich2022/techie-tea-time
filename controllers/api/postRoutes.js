const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post-by-id/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: "No Post Found" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.err(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json({ message: "Unauthorized: User not logged in" });
      return;
    }
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      created_by: userId,
    });
    res.status(200).json({ message: "Post Created!" });
  } catch (err) {
    console.err(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not logged in" });
    }

    const userId = req.session.user_id;
    const post = await Post.findOne({
      where: {
        id: req.params.id,
        created_by: userId,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Unauthorized: Incorrect User or Post does not exist",
      });
    }

    const deletedRows = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
