const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  ISBN: {
    type: String,
  },
  publisher: {
    type: String,
  },
  publication_date: {
    type: String,
  },
  genre: {
    type: String,
  },
  description: {
    type: String,
  },
  number_of_pages: {
    type: Number,
  },
  average_rating: {
    type: Number,
  },
  price: {
    type: String,
  },
});

const BookModel = mongoose.model('million',bookSchema);

module.exports = BookModel;
