const boom = require('@hapi/boom');

class SurveyService {
  constructor() {

  }

  create(data) {
    console.log('creating...');

    return {
      status: 'creating survey...',
      ...data
    }
  }

  getAllSurveys() {
    console.log('getting all surveys...');

  }
}

module.exports = SurveyService;
