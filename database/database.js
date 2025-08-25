const { Pool } = require('pg');
const dbConfig = require('../keys');
const isLocal = dbConfig.HOST === 'localhost' || dbConfig.HOST === '127.0.0.1';

const connection = new Pool({
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

connection.connect()
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
  })
  .catch(err => {
    console.error("Error al conectar a la base de datos:", err);
  });

module.exports = connection;

