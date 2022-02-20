const boom = require('@hapi/boom');
const AnswerService = require('./answer.services');

const {
  dbClient,
  Client
} = require('../database/database');
class SurveyService {
  constructor() {
    this.answerService = new AnswerService();
  }

  async create(data) {
    const db = new Client(dbClient);
    let survey;
    let dataToStore = [];

    try {
      await db.connect();

      const { date, rank, answers } = data;

      survey = await db.query(`insert into DB_SURVEY(Creation_date, Person_rank) values($1, $2) RETURNING *`, [date, rank]);

      const {id: surveyId} = survey.rows[0];

      answers.forEach((answer) => {
        const { questionId, topics } = answer;

        topics.forEach((topic) => {
          const { topicId, answerOptionId } = topic;

          const data = {
            surveyId,
            questionId,
            topicId,
            answerOptionId
          }

          dataToStore = [...dataToStore, data];
        })
      });

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    const answers = await Promise.all(dataToStore.map(data => this.answerService.createAnswer(data)));

    const response = {
      survey: [...survey.rows],
      answers
    }

    return response;
  }

  async getAllSurveys() {
    const db = new Client(dbClient);

    let result;

    try {
      await db.connect();
      result = await db.query(`select * from DB_SURVEY`);

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return result.rows

  }

  getAllRanks() {
    return [
        {
          id: 1,
          text: 'General'
        },
        {
          id: 2,
          text: 'Coronel'
        },
        {
          id: 3,
          text: 'Teniente Coronel'
        }
    ]
  }
}

module.exports = SurveyService;


// QUERIES
// ANSWERS + RANK + DATE:
// select * from db_answer da
// join db_survey ds on da.id_survey = ds.id ;
