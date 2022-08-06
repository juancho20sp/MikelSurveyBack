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

      const dbAnswers = await Promise.all(dataToStore.map(data => this.answerService.createAnswer(data, db)));

      const response = {
        survey: [...survey.rows],
        answers: dbAnswers
      }

      return response;

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }
  }

  async getAllSurveys() {
    const db = new Client(dbClient);

    let result;
    const reviewedSurveys = [];
    const finalResult = [];

    try {
      await db.connect();

      result = await db.query(`select ds.creation_date, ds.id as survey_id, ds.person_rank, dq.id as ID_question, dq.factor, dt.title as topic, dao.text_answer as topic_answer from db_answer da
      join db_survey ds on da.id_survey = ds.id
      join db_answer_options dao on da.id_answer_option = dao.id
      join db_questions dq on da.id_question = dq.id
      join db_topics dt on da.id_topic = dt.id
      where ds.creation_date >= '2022-08-01'
      group by (ds.id, dq.text_question, dt.title, dao.text_answer, dq.id)
      order by ds.id, dq.id `);

      let allSurveyIdx = result.rows.map(row => row.survey_id);
      allSurveyIdx = [...new Set(allSurveyIdx)];


      result.rows.forEach(survey => {
        if (reviewedSurveys.includes(survey['survey_id'])){
          return;
        }

        const userData = result.rows.filter((data) => data.survey_id === allSurveyIdx[0]);

        const res = {};

        res['creation_date'] = userData[0]['creation_date'];
        res['survey_id'] = userData[0]['survey_id'];
        res['person_rank'] = userData[0]['person_rank'];

        userData.forEach((line) => {
          res[`${line.factor}-${line.topic}`] = line[`topic_answer`];
        });


        finalResult.push(res);

        reviewedSurveys.push(survey['survey_id']);

        if (allSurveyIdx.length > 0){
          allSurveyIdx.splice(0, 1);
        }
      });

    } catch(err){
      throw new Error(err.message);

    } finally {
      await db.end();
    }

    return finalResult;

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
