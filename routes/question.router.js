const express = require('express');

const QuestionService = require('../services/question.services');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getQuestionSchema,
  createQuestionSchema,
  updateQuestionSchema
} = require('../schemas/question.schema');

const router = express.Router();
const service = new QuestionService();

router.get('/', async (req, res, next) => {
  try {
    const topics = await service.getAllQuestions();

    res.json(topics);

  } catch(err){
    next(err);
  }
});

router.post('/',
  validatorHandler(createQuestionSchema, 'body'),
  async(req, res, next) => {
  try {
    const body = req.body;

    const topic = await service.create(body);
    res.status(201).json(topic);

  } catch(err) {
    next(err);
  }
})

module.exports = router;
