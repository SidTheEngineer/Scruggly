const rootRouter = require('./routers/root');
const apiRouter = require('./routers/api');

module.exports = (app) => {
  app.use('/', rootRouter);
  app.use('/api', apiRouter);
};
