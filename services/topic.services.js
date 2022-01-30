const boom = require('@hapi/boom');

class TopicService {
  constructor() {

  }

  create(data) {
    console.log('creating...');

    return {
      status: 'creating survey...',
      ...data
    }
  }

  update(data) {

  }

  delete(id) {

  }

  getAllTopics() {
    console.log('getting all topics...');

  }
}

module.exports = TopicService;
