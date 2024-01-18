const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', async () => {
  let joe, blogPost, comment;

  beforeEach(async () => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    });
    comment = new Comment({ content: 'Congrats on great post' });
  });
});
