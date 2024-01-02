const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const posts = require("./posts.json");
const comments = require("./comments.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(posts, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(comments, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
