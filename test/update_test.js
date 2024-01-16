const assert = require('assert');
const User = require('../src/user');

describe('Updating a user', async () => {
  let joe;

  beforeEach(async () => {
    try {
      joe = new User({ name: 'Joe' });
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
});
