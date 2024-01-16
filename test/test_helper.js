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
  await mongoose.connection.collection('users').drop();
});
