var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie');
var Item = require('../models/Item');
var http = require('http');

router.get('/:id', function (req, res, next) {
  Item.find({
    id: req.params.id,
  }, (err, item) => {
    if (err) {
      res.status(500);
      res.send({err: err});
    } else {
      res.send(item);
    }
  })
});

router.get('/:id/forceReload', function (req, res, next) {
  Movie.findById(req.params.id, function (err, movie) {
    if (err) return next(err);
    console.log('Force reloading movie ' + movie._id)
    const requestBody = JSON.stringify([
      {
        id: movie._id,
        input: movie.playUrl
      }
    ]);
    
    console.log(requestBody);
    const options = {
      host: '19november.freeddns.org',
      port: 1433,
      path: '/api/craw',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': requestBody.length
      }
    };
    const crawRequest = http.request(options, function (_res) {
      _res.on('data', function (data) {
        const resp = JSON.parse(data);
        movie.videoSource = resp[0].result;
        movie.save().then(function () {
          res.send(movie)
        });
      });
    });
    req.on('error', function (e) {
      console.error(e);
      res.status(500);
      res.send({err: e});
    });
    crawRequest.write(requestBody);
    crawRequest.end();
  })
});

module.exports = router;
