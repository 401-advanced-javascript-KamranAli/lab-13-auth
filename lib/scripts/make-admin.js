require('dotenv').config();
const connect = require('../connect');
require('../models/register-plugins');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

connect(process.env.MONGO_URI);

User.create({
  email: 'stuff@admin.com',
  hash: bcrypt.hashSync('password', 8),
  roles: []
}).then(user => {
  User.updateById(
    user._id,
    {
      $addToSet: {
        roles: 'admin'
      }
    }
  )
    .then(result => {
      console.log(result);
    })
    .catch()
    .finally(() => mongoose.connection.close());
});