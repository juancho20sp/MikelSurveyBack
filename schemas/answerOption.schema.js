const Joi = require('joi');

const id = Joi.number();
const text = Joi.string().min(3).max(75);
const value = Joi.number();

const createAnswerOptionSchema = Joi.object({
  text: text.required(),
  value: value.required()
});

const updateAnswerOptionSchema = Joi.object({
  id: id.required(),
  text: text.required(),
  value: value.required()
});

const getAnswerOptionSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createAnswerOptionSchema,
  updateAnswerOptionSchema,
  getAnswerOptionSchema
}

