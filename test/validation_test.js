const assert = require('assert');
const User = require('../src/user');

describe('Validating records', async () => {
  it('requires a user name', async () => {
    try {
      const user = await User.create({ name: undefined });
    } catch (error) {
      const { message } = error.errors.name;
      assert(message === 'Name is required');
    }
  });

  it('requires a user name longer than 2 character', async () => {
    try {
      const user = await User.create({ name: 'Al' });
    } catch (error) {
      const { message } = error.errors.name;

      assert(message === 'Name must be longer tha 2 character');
    }
  });

  it('disallows invalid record from being saved', async () => {
    try {
      const user = await User.create({ name: 'Al' });
    } catch (error) {
      const { message } = error.errors.name;
      assert(message === 'Name must be longer tha 2 character');
    }
  });
});
