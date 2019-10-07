const mongoose = require('mongoose');
const { Schema } = mongoose;


const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  label: {
    type: String
  },
  yearsActive: {
    type: Number,
    required: true
  }

});

module.exports = mongoose.model('Rapper', schema);