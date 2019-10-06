require('dotenv').config();
const connect = require('../connect');
require('../models/register-plugins');
const User = require('../models/user');
const mongoose = require('mongoose');

connect(process.env.MONGO_URI);
const userId = process.argv[2];

console.log('Making User', userId, 'admin');

User.addRole(
  userId,
  {
    $addToSet: {
      roles: 'admin'
    }
  }
)
  .then(console.log)
  .catch(console.log)
  .finally(() => mongoose.connection.close());