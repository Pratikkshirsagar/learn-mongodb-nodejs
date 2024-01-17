const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', async () => {
  let joe;

  beforeEach(async () => {
    try {
      joe = await User.create({ name: 'Joe', likes: 0 });
      await joe.save();
    } catch (err) {
      console.log(err);
    }
  });

  it('class method update one', async () => {
    await User.updateOne({ name: 'Joe' }, { $set: { name: 'Alex' } });

    const user = await User.findOne({ name: 'Joe' });

    assert(user === null);
  });

  it('model instance update many', async () => {
    await User.updateMany({ name: 'Joe' }, { $set: { name: 'Alex' } });

    const user = await User.findOne({ name: 'Joe' });

    assert(user === null);
  });

  it('A user can have their like count inscremeted by 1', async () => {
    await User.updateMany({ name: 'Joe' }, { $inc: { likes: 1 } });

    const user = await User.findOne({ name: 'Joe' });

    assert(user.likes === 1);
  });
});
