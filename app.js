var express = require('express');
var cors = require('cors')

require('./db/DB');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var actorRouter = require('./routes/actor');
var categoryRouter = require('./routes/category');
var movieRouter = require('./routes/movie');
var serieRouter = require('./routes/serie');
var episodeRouter = require('./routes/episode');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var requestRouter = require('./routes/request');
var manageRouter = require('./routes/manage');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/actor', actorRouter);
app.use('/api/category', categoryRouter);
app.use('/api/movie', movieRouter);
app.use('/api/serie', serieRouter);
app.use('/api/episode', episodeRouter);
app.use('/api/home', homeRouter);
app.use('/api/search', searchRouter);
app.use('/api/request', requestRouter);
app.use('/api/manage', manageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.json({err: 'not_found'});
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err: err});
});

module.exports = app;
