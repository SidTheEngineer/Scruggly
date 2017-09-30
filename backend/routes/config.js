'use strict';
const path = require('path');
const rootRouter = require('./routers/root');

module.exports = (app) => {
  app.use('/', rootRouter);
};
