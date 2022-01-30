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

  getAllRanks() {
    console.log('get all ranks')
  }
}

module.exports = SurveyService;
