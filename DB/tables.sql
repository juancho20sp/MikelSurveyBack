-- -----------------------------------------------------
-- Table `DB_SURVEY`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DB_SURVEY(
    Id                      SERIAL          PRIMARY KEY,
    Creation_date           DATE            NOT NULL
);

-- -----------------------------------------------------
-- Table `DB_QUESTIONS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DB_QUESTIONS(
    Id                          SERIAL              PRIMARY KEY,
    Text_Question               VARCHAR(300)        NOT NULL,
    Id_Survey                   INTEGER,
    CONSTRAINT UNQ_QUESTION UNIQUE (Text_Question)
);

-- -----------------------------------------------------
-- Table `DB_TOPICS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DB_TOPICS(
    Id                  SERIAL              PRIMARY KEY,
    Title               VARCHAR(100)        NOT NULL,
    Id_Question         INTEGER,
    CONSTRAINT UNQ_TOPIC UNIQUE (Title)
);

-- -----------------------------------------------------
-- Table `DB_ANSWER`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS DB_ANSWER(
    Id                  SERIAL              PRIMARY KEY,
    Text_Answer         VARCHAR(300)        NOT NULL,
    Answer_value        INTEGER             NOT NULL,
    Id_Topic            INTEGER             NOT NULL,
    Id_Question         INTEGER             NOT NULL,
    Id_Survey           INTEGER             NOT NULL,
    CONSTRAINT UNQ_ANSWER_TEXT UNIQUE (Text_Answer),
    CONSTRAINT UNQ_ANSWER_VALUE UNIQUE (Answer_value)
);

