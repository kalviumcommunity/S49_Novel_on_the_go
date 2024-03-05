const mongoose = require('mongoose');

const novelSchema = new mongoose.Schema({
  title: String,
  author: String,
  average_rating: Number
});

const novelData = mongoose.model('inputbook', novelSchema);

module.exports = novelData;
