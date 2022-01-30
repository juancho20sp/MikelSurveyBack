const boom = require('@hapi/boom');

class AnswerService {
  constructor() {

  }

  create(data) {
    console.log('creating...');

    return {
      status: 'creating survey...',
      ...data
    }
  }

  getAllAnswerOptions() {
    const options = [
      "Totalmente de acuerdo",
      "De acuerdo",
      "Neutral",
      "En desacuerdo",
      "Totalmente en desacuerdo"
    ]

    return options;
  }
}

module.exports = AnswerService;
