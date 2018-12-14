var knex = require('knex');

var instance = knex({
  client: 'mysql2',
  connection: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || '3306',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: process.env.MYSQL_DB || 'internet_banking'
  },
  pool: { min: 0, max: 50 },
  charset: 'utf8',
});

instance.on('query', ({ sql, bindings }) => {
  console.log(`-- knex: ${sql} -- params: ${bindings}`);
});

module.exports = instance;