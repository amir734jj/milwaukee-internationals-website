var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var _ = require('underscore');
var session = require('express-session');
var sequelizeStore = require('connect-session-sequelize')(session.Store);
var hash = require('sha1');
var expressBundles = require('express-bundles');
var mailer = require('nodemailer');

var app = express();

// use SMTP protocol to send Email
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
        user: "tourofmilwaukee@gmail.com",
        pass: "5385Eastbrook"
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    secure: true
});

var rootURL = "http://milwaukee-internationals.herokuapp.com";
global.mailService = require('./modules/email.js')(smtpTransport, rootURL);

var db;

// if (app.settings.env === "development") {
//     // initialize database with SQLite
//     db = new sequelize("database", "username", "password", {
//         host: "localhost",
//         dialect: "sqlite",
//         pool: {
//             max: 1,
//             min: 0,
//             idle: 10000
//         },
//         storage: "./database/db.sqlite",
//         logging: false
//     });
// } else if (app.settings.env === "production") {
    // initialize database with postgres
// }

var databaseModels = require('./modules/database.js')(db, sequelize);


app.get("/info", function(req, res, next) {
    res.json({
        "envirement": app.settings.env
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

//	sequelize ORM session store
app.use(session({
    secret: "this is a secret here!",
    store: new sequelizeStore({
        "db": db
    }),
    proxy: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

/* handles all routes */
var bundles = require('./modules/bundle')(app, expressBundles);
var router = require('./modules/router')(app, databaseModels, db, mailService);

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.locals.pretty = app.get('env') === "development";

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
