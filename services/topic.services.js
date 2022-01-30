const boom = require('@hapi/boom');
const client = require('../database/database');

class TopicService {
  constructor() {

  }

  async create(data) {
    await client.connect();

    let result;

    try {
      const { title } = data;

      result = await client.query(`insert into DB_TOPICS(Title) values($1, $2) RETURNING *`, [title], ["value 2"]);
    } catch(err){
      throw new Error(err.message);
    }

    client.end();

    return result.rows;
  }

  update(data) {

  }

  delete(id) {

  }

  getTopic(id) {
    console.log(`Getting topic with ID: ${id}`);

    return 0;
  }

  async getAllTopics() {
    await client.connect();

    let result;

    try {
      result = await client.query(`select * from DB_TOPICS`);
    } catch(err){
      throw new Error(err.message);
    }

    console.log(result.rows)

    client.end();

    return result.rows
  }
}

module.exports = TopicService;
