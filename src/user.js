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
  postCount: Number,
  posts: [PostSchema],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
