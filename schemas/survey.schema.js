const Joi = require('joi');

const id = Joi.number();
const date = Joi.date();
// const date = Joi.string();
const rank = Joi.string();
const answers = Joi.array();

// $ -> TODO
// https://stackoverflow.com/questions/55811158/sending-date-in-json-body-in-a-post-request-via-postman
const createSurveySchema = Joi.object({
  date: date.required(),
  rank: rank.required(),
  answers: answers.required()
});

const updateSurveySchema = Joi.object({
  id: id.required(),
  rank: rank.required()
});

const getSurveySchema = Joi.object({
  id: id.required()
});

module.exports = {
  createSurveySchema,
  updateSurveySchema,
  getSurveySchema
}

