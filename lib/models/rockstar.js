const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  yearsActive: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Rockstar', schema);