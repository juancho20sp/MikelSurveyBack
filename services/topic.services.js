const boom = require('@hapi/boom');
const {
  dbClient,
  Client
} = require('../database/database');

class TopicService {
  constructor() {

  }

  async create(data) {
    const db = new Client(dbClient);
    let result;

    try {
      await db.connect();

      const { title } = data;

      result = await db.query(`insert into DB_TOPICS(Title) values($1) RETURNING *`, [title]);
      await db.end();

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows;
  }

  update(data) {

  }

  delete(id) {

  }

  async getTopic(id) {
    const db = new Client(dbClient);

    let result;

    try {
      await db.connect();
      result = await db.query(`select * from DB_TOPICS where id=$1`, [id]);

      if (!(result.rows.length > 0)) {
        throw boom.notFound("Tópico no encontrado");
      }

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows
  }


  async getAllTopics() {
    const db = new Client(dbClient);

    let result;

    try {
      await db.connect();
      result = await db.query(`select * from DB_TOPICS`);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows
  }
}

module.exports = TopicService;
