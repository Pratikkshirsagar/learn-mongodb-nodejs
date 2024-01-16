const assert = require('assert');
const User = require('../src/user');
const { beforeEach } = require('mocha');

describe('Reding users out of the database', async () => {
  let joe;

  beforeEach(async () => {
    try {
      joe = new User({ name: 'Joe' });
      await joe.save();
    } catch (err) {
      console.log(err);
    }
  });

  it('find all users with a name of joe', async () => {
    try {
      const users = await User.find({ name: 'Joe' });

      assert(users[0]._id.toString() === joe._id.toString());
    } catch (err) {
      console.log(err);
    }
  });

  it('find a user with a particular id', async () => {
    try {
      const user = await User.findOne({ _id: joe._id });

      assert(user.name === 'Joe');
    } catch (err) {
      console.log(err);
    }
  });
});
