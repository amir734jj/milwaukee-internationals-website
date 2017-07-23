var routes = function(app, databaseModels, db) {
  var index = require('../routes/index');
  var register = require('../routes/register');
  var login = require('../routes/login');
  var logout = require('../routes/logout');
  var users = require('../routes/users');

  var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, [login, register, users]);

  /* order is important here */
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });

  app.use('/', index);
  app.use('/users', users);
  app.use('/register', register);
  app.use('/login', login);
  app.use('/logout', logout);

  return this;
};

module.exports = routes;
