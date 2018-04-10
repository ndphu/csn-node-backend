var express = require('express');
var router = express.Router();
var Actor = require('../models/Actor');
var Movie = require('../models/Movie');
var Serie = require('../models/Serie');

router.get('/q/:query', function (req, res, next) {
  const query = req.params.query;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.size ? parseInt(req.query.size) : 32;
  
  var response = {};
  var promises = [];
  
  promises.push(new Promise(function(resolve) {
    Actor.paginate({
      title: new RegExp('.*' + query + '.*', 'i')
    }, {
      sort: {title: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.actor = resp;
      resolve();
    });
  }));
  
  promises.push(new Promise(function(resolve) {
    Movie.paginate({
      normTitle: new RegExp('.*' + query + '.*', 'i')
    }, {
      select: 'id title poster categories',
      sort: {normTitle: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.movie = resp;
      resolve();
    });
  }));
  
  promises.push(new Promise(function(resolve) {
    Serie.paginate({
      title: new RegExp('.*' + query + '.*', 'i')
    }, {
      select: 'id title poster categories',
      sort: {normTitle: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.serie = resp;
      resolve();
    });
  }));
  
  Promise.all(promises).then(function () {
    res.json(response);
  })
});

module.exports = router;
