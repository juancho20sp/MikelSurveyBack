const Joi = require('joi');

const id = Joi.number();
const title = Joi.string().min(3).max(75);
// const idQuestion = Joi.string()

const createTopicSchema = Joi.object({
  title: title.required()
});

const updateTopicSchema = Joi.object({
  id: id.required(),
  title: title.required()
});

const getTopicSchema = Joi.object({
  id: id.required()
});

module.exports = {
  getTopicSchema,
  updateTopicSchema,
  createTopicSchema

}

