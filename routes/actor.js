var express = require('express');
var router = express.Router();
var Actor = require('../models/Actor');
var Movie = require('../models/Movie');

router.get('/:id', function (req, res, next) {
  Actor.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

router.get('/byKey/:actorKey', function (req, res, next) {
  Actor.find({
    key: req.params.actorKey
  }, function (err, resp) {
    if (err) return next(err);
    res.json(resp[0]);
  });
});

router.get('/:id/movie', function (req, res, next) {
  Actor.findById(req.params.id, function (err, actor) {
    if (err) return next(err);
    Movie.paginate({
      actors: actor.title
    }, {
      select: 'id title categories poster',
      sort: {title: 1},
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.size ? parseInt(req.query.size) : 32
    }, function (err, movies) {
      res.json({
        actor: actor,
        movies: movies
      });
    });
  })
});

module.exports = router;
