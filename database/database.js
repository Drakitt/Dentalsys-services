const { Pool } = require('pg');
const dbConfig = require('../keys');

const connection = new Pool({
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  port: dbConfig.PORT
});

connection.connect()
  .then(() => {
    console.log("Conexión exitosa a la base de datos.");
  })
  .catch(err => {
    console.error("Error al conectar a la base de datos:", err);
  });

module.exports = connection;

