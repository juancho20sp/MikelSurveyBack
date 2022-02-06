const express = require('express');

const AnswerService = require('../services/answer.services');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createAnswerOptionSchema,
  getAnswerOptionSchema,
  updateAnswerOptionSchema
} = require('../schemas/answerOption.schema');

const router = express.Router();
const service = new AnswerService();

router.get('/', async (req, res) => {
  const options = await service.getAllAnswerOptions();

  res.status(200).json(options);
});

router.post('/',
  validatorHandler(createAnswerOptionSchema, 'body'),
  async(req, res, next) => {
  try {
    const body = req.body;
    const answerOption = await service.createAnswerOption(body);
    res.status(201).json(answerOption);

  } catch(err) {
    next(err);
  }
})

module.exports = router;
