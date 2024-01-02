const User = require("./Users");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasOne(Post, {
  foreignKey: "created_by",
});

Post.belongsTo(User, {
  targetKey: "id",
  foreignKey: "created_by",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Post.hasOne(Comment, {
  foreignKey: "post_id",
  targetKey: "id",
});

Comment.belongsTo(User, {
  targetKey: "id",
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  targetKey: "id",
  foreignKey: "post_id",
});

module.exports = { User, Post, Comment };
