const config = require('config');
const knex = require('knex')({
  client: 'pg',
  connection: config.get('dbConfig.connection')
});

module.exports = require('bookshelf')(knex);