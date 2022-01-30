const express = require('express');

const SurveyService = require('../services/survey.services');

const router = express.Router();
const service = new SurveyService();

router.get('/', (req, res) => {
  res.json({
    message: 'Everything working fine!'
  })
});

router.post('/', (req, res) => {
  const body = req.body;

  const survey = service.create(body);

  res.json({
    message: 'post working',
    ...survey
  })
})

module.exports = router;
