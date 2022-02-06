const Joi = require('joi');

const id = Joi.number();
const text = Joi.string().min(3).max(500);
const isShared = Joi.boolean();


const createQuestionSchema = Joi.object({
  text: text.required(),
  isShared: isShared.required()
});

const updateQuestionSchema = Joi.object({
  id: id.required(),
  text: text.required()
});

const getQuestionSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createQuestionSchema,
  updateQuestionSchema,
  getQuestionSchema
}

