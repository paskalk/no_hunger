require('dotenv').config();
const pool = require('pg').Pool

const db = new pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: 5432,
    ssl: true
  })


module.exports=db;