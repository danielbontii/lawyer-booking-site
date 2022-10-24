const Pool = require("pg").Pool;

const pool = new Pool({
  connectionString: process.env.DB_STRING,
  ssl: {rejectUnauthorized: false}
});

module.exports = pool;
