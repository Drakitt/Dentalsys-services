const fs = require('fs');
require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST,
  // HOST: 'localhost',
  // USER: 'postgres',
  // PASSWORD: '2012',
  USER: process.env.DB_USER,
  PASSWORD: process.env.API_KEY,
  DB: 'DentalsysAzure',
  PORT: '5432',
  KEY: 'Raquelita'
  // KEY: {
  //   ca: fs.readFileSync("{ca-cert filename}")
  // }
};
