const express = require('express');

const SurveyService = require('../services/survey.services');
const validatorHandler = require('../middlewares/validator.handler');

const {
  createSurveySchema,
  updateSurveySchema,
  getSurveySchema
} = require('../schemas/survey.schema');

const router = express.Router();
const service = new SurveyService();

router.get('/', async (req, res, next) => {
  try {
    const surveys = await service.getAllSurveys();

    res.json(surveys);

  } catch(err){
    next(err);
  }
});

router.post('/',
  validatorHandler(createSurveySchema, 'body'),
  async(req, res, next) => {
  try {
    const body = req.body;
    const topic = await service.create(body);
    res.status(201).json(topic);

  } catch(err) {
    next(err);
  }
})

router.get('/ranks', (req, res, next) => {
  try {
    const surveys = service.getAllRanks();

    res.json(surveys);

  } catch(err){
    next(err);
  }
});

module.exports = router;
