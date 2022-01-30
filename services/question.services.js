const boom = require('@hapi/boom');

class QuestionService {
  constructor() {

  }

  create(data) {
    console.log('creating...');

    return {
      status: 'creating question...',
      ...data
    }
  }

  update(data) {

  }

  delete(id) {

  }

  getAllQuestions() {
    console.log('getting all questions...');

  }
}

module.exports = QuestionService;
