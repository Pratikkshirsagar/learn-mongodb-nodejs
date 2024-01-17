const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', async () => {
  it('Can create a subdocument', async () => {
    await User.collection.insertOne({
      name: 'Joe',
      posts: [{ title: 'Js and Me' }],
    });

    const joe = await User.collection.findOne({ name: 'Joe' });

    assert(joe.posts[0].title === 'Js and Me');
  });

  it('Can add subdocument to an existing record', async () => {
    await User.collection.insertOne({
      name: 'Joe',
      posts: [{ title: 'Js and Me' }],
    });

    const joe = await User.findOne({ name: 'Joe' });

    joe.posts.push({ title: 'Js Land' });

    await joe.save();

    assert(joe.posts[1].title === 'Js Land');
  });

  it('Can remove existing subdocument', async () => {
    await User.collection.insertOne({
      name: 'Joe',
      posts: [{ title: 'Js and Me' }],
    });

    const joe = await User.findOne({ name: 'Joe' });
    const post = joe.posts[0];
    joe.posts.pull(post);

    await joe.save();

    const updatedJoe = await User.findOne({ name: 'Joe' });

    assert(updatedJoe.posts.length === 0);
  });
});
