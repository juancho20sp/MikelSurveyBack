const express = require('express');

const {
  surveyRouter,
  questionRouter,
  topicRouter,
  answerRouter
} = require('./routers');

function router(app) {
  const router = express.Router();

  // VERSION 1
  app.use('/api/v1', router);
  router.use('/survey', surveyRouter);
  router.use('/question', questionRouter);
  router.use('/topics', topicRouter);
  router.use('/answers', answerRouter);

}

module.exports = router;
