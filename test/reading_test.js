const assert = require('assert');
const User = require('../src/user');
const { beforeEach } = require('mocha');

describe('Reding users out of the database', async () => {
  let joe, maria, alex, zach;

  beforeEach(async () => {
    try {
      alex = await User.create({ name: 'Alex' });
      joe = await User.create({ name: 'Joe' });
      maria = await User.create({ name: 'Maria' });
      zach = await User.create({ name: 'Zach' });
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

  it('can skip and limit the result set', async () => {
    try {
      const users = await User.find({}).sort({ name: 1 }).skip(1).limit(2);

      assert(users.length === 2);
      assert(users[0].name === 'Joe');
      assert(users[1].name === 'Maria');
    } catch (err) {
      console.log(err);
    }
  });
});
