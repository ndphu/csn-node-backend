const express = require('express');
const cors = require('cors')

require('./db/DB');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const actorRouter = require('./routes/actor');
const categoryRouter = require('./routes/category');
const movieRouter = require('./routes/movie');
const serieRouter = require('./routes/serie');
const episodeRouter = require('./routes/episode');
const homeRouter = require('./routes/home');
const searchRouter = require('./routes/search');
const requestRouter = require('./routes/request');
const manageRouter = require('./routes/manage');
const itemRouter = require('./routes/item');

const app = express();
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
app.use('/api/item', itemRouter);

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
