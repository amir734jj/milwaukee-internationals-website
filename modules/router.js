var routes = function(app, databaseModels, db) {
  var indexRouter = require('../routes/index'); // index page
  var userRouter = require('../routes/user'); // user page
  var studentRouter = require('../routes/student'); // student page
  var personRouter = require('../routes/person'); // student page
  var mappingRouter = require('../routes/mapping'); // mapping page

  var userCtrl = require('../models/userCtrl')(databaseModels.userModel, db, [userRouter]);
  var studentCtrl = require('../models/studentCtrl')(databaseModels.studentModel, db, [studentRouter]);
  var personCtrl = require('../models/personCtrl')(databaseModels.personModel, db, [personRouter]);

  /* order is important here */
  app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var urlVar = req.originalUrl.match(/[\w]+/g);

    if (urlVar) {
      if (urlVar.includes("list")) {
        urlVar = "list";
      } else if (urlVar.includes("register")) {
        urlVar = "register";
      } else {
        urlVar = urlVar[0];
      }
    } else {
      urlVar = "index";
    }

    res.locals.pageName = urlVar;

    next();
  });

  app.use('/', indexRouter);
  app.use('/user', userRouter);
  app.use('/student', studentRouter);
  app.use('/person', personRouter);
  app.use('/mapping', mappingRouter);

  return this;
};

module.exports = routes;
