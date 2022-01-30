const express = require('express');

const TopicService = require('../services/topic.services');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getTopicSchema,
  createTopicSchema,
  updateTopicSchema
} = require('../schemas/topic.schema');

const router = express.Router();
const service = new TopicService();

router.get('/', async (req, res, next) => {
    try {
      const topics = await service.getAllTopics();

      res.json(topics);

    } catch(err){
      next(err);
    }
});

router.get('/:id',
  validatorHandler(getTopicSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const topic = await service.getTopic(id);

      res.json(topic);

    } catch(err){
      next(err);
    }
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
