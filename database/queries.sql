-- GET TOTAL RESPONSES PER QUESTION / TOPIC
select id_question, count(*), id_topic, id_answer_option  from db_answer da group by (id_question, id_topic, id_answer_option) order by id_question, id_topic

-- THE ONE FROM ABOVE, BUT BETTER
select dq.text_question, id_question, count(*) as Total_Answers, id_topic, dt.title, id_answer_option, dao.text_answer  from db_answer da
join db_answer_options dao on da.id_answer_option = dao.id
join db_topics dt on da.id_topic = dt.id
join db_questions dq on da.id_question = dq.id
group by (id_question, id_topic, id_answer_option, dao.text_answer, dt.title, dq.text_question) order by id_question, id_topic

-- THE ONE FROM ABOVE, BUT READY TO BE PRESENTED
select dq.text_question, count(*) as Total_Answers, dt.title, dao.text_answer  from db_answer da
join db_answer_options dao on da.id_answer_option = dao.id
join db_topics dt on da.id_topic = dt.id
join db_questions dq on da.id_question = dq.id
group by (id_question, id_topic, id_answer_option, dao.text_answer, dt.title, dq.text_question) order by id_question, id_topic


-- QUERY MIKEL'S STYLE
select ds.creation_date, ds.id as survey_id, ds.person_rank, dq.id as ID_question, dq.factor, dt.title as topic, dao.text_answer as topic_answer from db_answer da
join db_survey ds on da.id_survey = ds.id
join db_answer_options dao on da.id_answer_option = dao.id
join db_questions dq on da.id_question = dq.id
join db_topics dt on da.id_topic = dt.id
group by (ds.id, dq.text_question, dt.title, dao.text_answer, dq.id)
order by ds.id, dq.id
