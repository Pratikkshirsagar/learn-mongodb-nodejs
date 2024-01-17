const assert = require('assert');
const User = require('../src/user');

describe('Virtual type', async () => {
  it('post count returns number of post', async () => {
    const joe = await User.create({
      name: 'Joe',
      posts: [{ title: 'Js and Me' }],
    });

    assert(joe.postCount === 1);
  });
});
