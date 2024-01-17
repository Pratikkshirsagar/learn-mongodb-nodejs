const assert = require('assert');
const User = require('../src/user');

describe('Validating records', async () => {
  it('requires a user name', async () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required');
  });

  it('requires a user name longer than 2 character', async () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer tha 2 character');
  });

  it('disallows invalid record from being saved', async () => {
    try {
      const user = new User({ name: 'Al' });
      await user.save();
    } catch (error) {
      const { message } = error.errors.name;
      assert(message === 'Name must be longer tha 2 character');
    }
  });
});
