const express = require('express');

const surveyRouter = require('./survey.router');

function router(app) {
  const router = express.Router();

  // VERSION 1
  app.use('/api/v1', router);
  router.use('/register-survey', surveyRouter);

}

module.exports = router;
