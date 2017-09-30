'use strict';
const bodyParser = require('body-parser');
const errorHandler = require('../middleware/errors');
const configRoutes = require('../routes/config');
const port = process.env.PORT || '3000';

/**
 * initial app configuration
 * @param  {Object} app express application
 */
const configure = (app) => {
  app.set('port', port);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());

  configRoutes(app);
  app.use(errorHandler);
};

/**
 * app startup
 * @param  {Object} server
 */
const start = (server) => {
  server.listen(port);

  server.on('listening', () => {
    console.log(`Scruggly running on Port ${port}.`);
  });

  server.on('error', err => {
    throw err;
  });
};

module.exports = {
  configure,
  start
};
