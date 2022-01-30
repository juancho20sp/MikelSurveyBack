const express = require('express');

const surveyRouter = require('./survey.router');
const questionRouter = require('./question.router');
const topicRouter = require('./topic.router');

function router(app) {
  const router = express.Router();

  // VERSION 1
  app.use('/api/v1', router);
  router.use('/survey', surveyRouter);
  router.user('/question', questionRouter);
  router.use('/topics', topicRouter);

}

module.exports = router;
