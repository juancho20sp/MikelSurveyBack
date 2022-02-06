const boom = require('@hapi/boom');
const {
  dbClient,
  Client
} = require('../database/database');
class QuestionService {
  constructor() {

  }

  async create(data) {
    const db = new Client(dbClient);
    let result;

    try {
      await db.connect();

      const { text, isShared } = data;

      result = await db.query(`insert into DB_QUESTIONS(Text_Question, Is_Shared) values($1, $2) RETURNING *`, [text, isShared]);

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

  async getAllQuestions() {
    const db = new Client(dbClient);

    let result;

    try {
      await db.connect();
      result = await db.query(`select * from DB_QUESTIONS`);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows
  }
}

module.exports = QuestionService;
