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
    let answerResponse;

    try {
      await db.connect();

      answerResponse = [];

      const { date, rank, answers } = data;

      // TODO LIST
      // CREATE SURVEY
      // ANSWERS:
      //    REGISTER ANSWER
      //        CONNECT WITH QUESTION
      //            FOR EACH TOPIC:
      //                CONNECT WITH TOPIC

      survey = await db.query(`insert into DB_SURVEY(Creation_date, Person_rank) values($1, $2) RETURNING *`, [date, rank]);
      // survey = 0;

      const {id: surveyId} = survey.rows[0];

      console.log('  ---  ')
      console.log('Survey: ')
      console.log(survey.rows)
      console.log(surveyId)
      console.log('  ---  ')


      answers.forEach((answer) => {
        const { questionId, topics } = answer;

        topics.forEach(async (topic) => {
          const { topicId, answerOptionId } = topic;

          const data = {
            surveyId,
            questionId,
            topicId,
            answerOptionId
          }

          const newAnswer = await this.answerService.createAnswer(data)
          // answerResponse = [...answerResponse, newAnswer];
          answerResponse.push(newAnswer)

          console.log(answerResponse)
        })
      });

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    function resolveAfter2Seconds() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('resolved');
        }, 500);
      });
    }

    const response = {
      survey: [...survey.rows],
      answers: answerResponse
    };

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
    return {
      status: 200,
      data: [
        'General',
        'Coronel',
        'Teniente Coronel'
      ]
    }
  }
}

module.exports = SurveyService;
