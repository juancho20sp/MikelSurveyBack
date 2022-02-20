const boom = require('@hapi/boom');

const {
  dbClient,
  Client
} = require('../database/database');
class AnswerService {
  constructor() {

  }

  async createAnswer(data) {
    const db = new Client(dbClient);
    let result;

    try {
      await db.connect();

      const {
        surveyId,
        questionId,
        topicId,
        answerOptionId
      } = data;

      result = await db.query(`insert into DB_ANSWER(Id_Answer_Option, Id_Topic, Id_Question, Id_Survey) values($1, $2, $3, $4) RETURNING *`, [answerOptionId, topicId, questionId, surveyId]);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows[0];
  }

  async createAnswerOption(data) {
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
      result = await db.query(`select * from DB_ANSWER_OPTIONS order by answer_value desc`);

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
