const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const UserPostInteraction = require('./UserPostInteraction');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
  through: UserPostInteraction,
  as: 'liked_posts',
  foreignKey: 'user_id',
});

Post.belongsToMany(User, {
  through: UserPostInteraction,
  as: 'liked_users',
  foreignKey: 'post_id',
});

module.exports = { User, Post, Comment, UserPostInteraction };
