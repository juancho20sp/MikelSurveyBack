const boom = require('@hapi/boom');

const {
  dbClient,
  Client
} = require('../database/database');
class AnswerService {
  constructor() {

  }

  async create(data) {
    const db = new Client(dbClient);
    let result;

    try {
      await db.connect();

      const { text, value } = data;

      result = await db.query(`insert into DB_ANSWER_OPTIONS(Text_Answer, Answer_value) values($1, $2) RETURNING *`, [text, value]);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows;
  }

  async getAllAnswerOptions() {
    const db = new Client(dbClient);

    let result;

    try {
      await db.connect();
      result = await db.query(`select * from DB_ANSWER_OPTIONS`);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows
  }
}

module.exports = AnswerService;


// const options = [
//   "Totalmente de acuerdo -> 4",
//   "De acuerdo -> 3",
//   "Neutral -> 2",
//   "En desacuerdo -> 1",
//   "Totalmente en desacuerdo -> 0"
// ]
