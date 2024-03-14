const Joi = require('joi');
const mongoose = require('mongoose');

const booksSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  average_rating: Joi.number().required(),
  userName: Joi.string().required(),
});

const novelSchema = new mongoose.Schema({
  title: String,
  author: String,
  average_rating: Number,
  userName: String
});

const NovelData = mongoose.model('inputbook', novelSchema);

const validateBooks = (payload) => {
  return booksSchema.validate(payload, { abortEarly: false });
};

module.exports = { NovelData, validateBooks };
