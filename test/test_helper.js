const { beforeEach, before } = require('mocha');
const mongoose = require('mongoose');

require('dotenv').config();

before(async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.test_db_connection_url}`
    );
    console.log('Connection successfull');
  } catch (error) {
    console.log('Error in connecting', error);
  }
});

beforeEach(async () => {
  try {
    await Promise.all([
      mongoose.connection.collection('users').drop(),
      mongoose.connection.collection('blogPost').drop(),
      mongoose.connection.collection('comment').drop(),
    ]);
  } catch (error) {
    console.log(error);
  }
});
