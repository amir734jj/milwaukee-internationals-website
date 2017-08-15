var routes = function(app, databaseModels, db) {
  var indexRouter = require('../routes/index'); // index page
  var userRouter = require('../routes/user'); // user page
  var studentRouter = require('../routes/student'); // student page
  var personRouter = require('../routes/person'); // student page
  var tourRouter = require('../routes/tour'); // mapping page
  var driverMappingRouter = require('../routes/mappingDriver'); // mapping page
  var hostMappingRouter = require('../routes/mappingHost'); // mapping page

  var redirects = require("../constants/redirects.json");

  var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, [userRouter]);
  var studentCtrl = require('../models/studentCtrl')(databaseModels, db, [studentRouter]);
  var personCtrl = require('../models/personCtrl')(databaseModels, db, [personRouter]);
  var driverMappingCtrl = require('../models/driverMappingCtrl')(databaseModels, db, [driverMappingRouter, hostMappingRouter]);
  var hostMappingCtrl = require('../models/hostMappingCtrl')(databaseModels, db, [driverMappingRouter, hostMappingRouter]);
  var tourCtrl = require('../models/tourCtrl')(databaseModels.studentModel, db, [tourRouter]);

  /* order is important here */
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.pageURL = req.originalUrl;

    if (redirects[req.originalUrl]) {
      res.redirect(redirects[req.originalUrl]);
    } else {
      next();
    }
  });

  app.use('/', indexRouter);
  app.use('/mapping/driver', driverMappingRouter);
  app.use('/mapping/host', hostMappingRouter);
  app.use('/user', userRouter);
  app.use('/student', studentRouter);
  app.use('/person', personRouter);
  app.use('/tour', tourRouter);

  return this;
};

module.exports = routes;
