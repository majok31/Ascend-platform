const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       
  host: 'localhost',        // Default host
  database: 'ascend',       
  password: 'Nyabor27',
  port: 5432,               // Default PostgreSQL port
});

module.exports = pool;
