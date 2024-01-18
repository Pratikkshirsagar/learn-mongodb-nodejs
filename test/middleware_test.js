const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Association', async () => {
  let joe, blogPost;
  beforeEach(async () => {
    try {
      joe = new User({ name: 'Joe' });
      blogPost = new BlogPost({
        title: 'JS is Great',
        content: 'Yep it really is',
      });

      joe.blogPosts.push(blogPost);

      await joe.save();
      await blogPost.save();
    } catch (error) {
      console.log(error);
    }
  });

  it('users clean up dangling blogposts on remove', async () => {
    await joe.deleteOne({ name: 'Joe' });
    const count = await BlogPost.countDocuments();
    assert(count === 0);
  });
});
