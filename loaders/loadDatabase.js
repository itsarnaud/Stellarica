require('dotenv').config();

const mysql     = require('mysql');
const host      = process.env.BDD_HOST;
const user      = process.env.BDD_USER;
const password  = process.env.BDD_PASS; 
const database  = process.env.BDD_DB; 
const port      = process.env.BDD_PORT;

module.exports = () => {
  const pool = mysql.createPool({
    connectionLimit : 10, // ajustez ce nombre en fonction de vos besoins
    host,
    user,
    password,
    database,
    port
  });

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Erreur lors de la connexion à la base de données :', err);
      return;
    }
    console.log('Connexion à la base de données établie !');
    connection.release();
  });

  return pool;
}