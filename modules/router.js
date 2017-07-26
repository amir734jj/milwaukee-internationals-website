var routes = function(app, databaseModels, db) {
  var index = require('../routes/index');
  var register = require('../routes/register');
  var login = require('../routes/login');
  var logout = require('../routes/logout');
  var users = require('../routes/users');
  var registerForTour = require('../routes/registerForTour');

  var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, [login, register, users]);
  var studentCtrl = require('../models/studentCtrl')(databaseModels.studentModel, db, [registerForTour]);

  /* order is important here */
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
  });

  app.use('/', registerForTour);
  app.use('/users', users);
  app.use('/register', register);
  app.use('/login', login);
  app.use('/logout', logout);
  app.use('/register-for-tour', registerForTour);

  return this;
};

module.exports = routes;
