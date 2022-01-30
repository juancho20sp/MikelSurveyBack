const { Client } = require('pg');
require('dotenv').config();

// process.env.NOMBRE
const dbClient = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { rejectUnauthorized: false }
}

// client.on('connect', () => {
//   console.log('Database connection');
// })

// client.on('end', () => {
//   console.log(`
//   host: ${process.env.HOST},
//   port: ${process.env.DB_PORT},
//   user: ${process.env.USER},
//   password: ${process.env.PASSWORD},
//   database: ${process.env.DATABASE}
//   `)

//   console.log('Connection end');
// })

// client.connect();


module.exports = {
  dbClient,
  Client
};


// client.connect();

// client.query(`select * from questions where id=$1`, [1], (err, res) => {
//   if (!err) {
//     console.log(res.rows);
//   }

//   client.end();
// })

// client.connect();

// const query = async() => {
//   await client.connect();

//   try {
//     const result = await client.query(`select * from questions where id=$1`, [1])

//     console.log(result.rows);
//   } catch(err){
//     console.log(err);
//   }


//   client.end();
// }


// const insert = async() => {
//   await client.connect();

//   try {
//     const result = await client.query(`insert into questions(name, address) values($1, $2) RETURNING *`, ["value 1"], ["value 2"])

//     console.log(result.rows);
//     console.log(result.rowCount);
//   } catch(err){
//     console.log(err);
//   }


//   client.end();
// }


