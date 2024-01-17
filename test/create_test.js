const assert = require('assert');
const User = require('../src/user');

describe('Creating record', async () => {
  it('Saving a user', async () => {
    const joe = await User.create({ name: 'Joe' });
    assert(!joe.isNew);
  });
});
