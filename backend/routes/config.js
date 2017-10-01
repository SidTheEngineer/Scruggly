const rootRouter = require('./routers/root');
const authRouter = require('./routers/auth');

module.exports = (app) => {
  app.use('/', rootRouter);
  app.use('/callback', authRouter);
};
