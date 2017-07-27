var routes = function(app, databaseModels, db) {
  var index = require('../routes/index');
  var register = require('../routes/register');
  var login = require('../routes/login');
  var logout = require('../routes/logout');
  var users = require('../routes/users');
  var registerForTour = require('../routes/registerForTour');
  var registerPerson = require('../routes/registerPerson');
  var hostList = require('../routes/hostList');
  var driverList = require('../routes/driverList');
  var driverMapping = require('../routes/driverMapping');

  var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, [login, register, users]);
  var studentCtrl = require('../models/studentCtrl')(databaseModels.studentModel, db, [registerForTour]);
  var personCtrl = require('../models/personCtrl')(databaseModels.personModel, db, [registerPerson, hostList, driverList]);

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
  app.use('/register-person', registerPerson);
  app.use('/host-list', hostList);
  app.use('/driver-list', driverList);
  app.use('/driver-mapping', driverMapping);

  return this;
};

module.exports = routes;
