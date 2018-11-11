const user = require('./user/user.route');

module.exports = (app) => {
  app.use('/api/user/', user);
  app.use((e, req, res, next) => {
    if (!next) return null;
    const err = e;
    return res.status(500).json({ message: err.message, stack: err.stack });
  });
}
