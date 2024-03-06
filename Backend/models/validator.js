
const Joi= require('joi')
const validator = (schema)=> (payload)=> 
  schema.validate(payload, {abortEarly: false});
const booksSchema= Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      average_rating: Joi.number().required(),
});

exports.validateBooks = validator(booksSchema)
