const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', async () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    try {
      joe = new User({ name: 'Joe' });

      blogPost = new BlogPost({
        title: 'JS is Great',
        content: 'Yep it really is',
      });

      comment = new Comment({ content: 'Congrats on great post' });

      joe.blogPosts.push(blogPost);
      blogPost.comments.push(comment);
      comment.user = joe;

      await joe.save();
      await blogPost.save();
      await comment.save();
    } catch (error) {
      console.log(error);
    }
  });

  it.only('saves a relation between user and blogpost', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate('blogPosts');
    assert(user.blogPosts[0].title === 'JS is Great');
  });

  it.only('saves a full relation tree', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: { path: 'comments' },
    });
    assert(user.blogPosts[0].title === 'JS is Great');
    assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
  });
});
