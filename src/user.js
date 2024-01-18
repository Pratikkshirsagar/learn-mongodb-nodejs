const mongoose = require('mongoose');
const PostSchema = require('../src/post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer tha 2 character',
    },
    required: [true, 'Name is required'],
  },
  likes: Number,
  posts: [PostSchema],
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }],
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

UserSchema.pre('deleteOne', { document: true }, async function (next) {
  const BlogPost = mongoose.model('blogPost');
  await BlogPost.deleteMany({ _id: { $in: this.blogPosts } });
  next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
