const mongoose = require('mongoose');
const Joi = require('joi');

// Define Joi schema for registration form
const regFormSchema = Joi.object({
  userName: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Define Mongoose schema for MongoDB
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
    unique: true // Ensure email is unique
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
});

// Create Mongoose model based on the schema
const UserModel = mongoose.model('login', UserSchema);

// Export both Joi schema and Mongoose model
module.exports = {
  regFormSchema,
  UserModel
};
