require('dotenv').config()
const config = require('./config/development_config');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// session-middleware

var session = require('express-session');

const passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
const login = require('./routes/login');
const crawler = require('./routes/crawler');
const notification = require('./routes/notification');
const beach = require('./routes/beach');
const activity = require('./routes/activity');

var app = express();

// cors
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, x-access-token')

  res.header('Access-Control-Expose-Headers', 'x-access-token')

  res.header('Access-Control-Allow-Credentials', true);

  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var memoryStore =  express-session.MemoryStore();

// var sessionStore =  memoryStore();

// var sessionObject = session;
var sessionStore = new session.MemoryStore();

var sessionMiddleware = session({
  secret: config.sessionSecret, resave: true, saveUninitialized: true,
  store: sessionStore,
  cookie: {
    domain: config.domains,
    httpOnly: false,
  }
});

app.use(sessionMiddleware);

// set passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/api/beach', login);
app.use('/api/beach', crawler);
app.use('/api/beach', notification);
app.use('/api/beach', beach);
app.use('/api/beach', activity);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
