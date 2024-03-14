const mongoose = require('mongoose');
const Joi = require('joi');

const regFormSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});


const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
});

const UserModel = mongoose.model('login', UserSchema);
module.exports = {
  regFormSchema,
  UserModel
};
