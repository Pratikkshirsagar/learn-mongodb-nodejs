const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', async () => {
  let joe;

  beforeEach(async () => {
    try {
      joe = await User.create({ name: 'Joe' });
    } catch (err) {
      console.log(err);
    }
  });

  it('class method delete', async () => {
    await User.deleteOne();

    const user = await User.findOne({ name: 'Joe' });

    assert(user === null);
  });

  it('model instance delete many', async () => {
    await User.deleteMany();

    const user = await User.findOne({ name: 'Joe' });

    assert(user === null);
  });
});
