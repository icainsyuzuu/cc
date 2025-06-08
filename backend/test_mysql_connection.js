const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3307 // sesuaikan
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting: ', err);
    return;
  }
  console.log('Connected to MySQL!');
  connection.end();
});
