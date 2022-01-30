const express = require('express');

const AnswerService = require('../services/answer.services');

const router = express.Router();
const service = new AnswerService();

router.get('/options', async (req, res) => {
  const options = await service.getAllAnswerOptions();

  res.status(200).json(options);
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
