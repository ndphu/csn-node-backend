var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.Promise = global.Promise;

var mongoDB = 'mongodb://19november.freeddns.org:5050/csndb';
mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connectino error:'));
db.once('open', function () {
  console.log('connect');
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var artistsRouter = require('./routes/artists');
var tracksRouter = require('./routes/tracks');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/artist', artistsRouter);
app.use('/track', tracksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
