var express = require('express');
var router = express.Router();
var Category = require('../models/Category');
var Item = require('../models/Item');

router.get('/:id', function (req, res, next) {
  Category.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

router.get('/:id/movie', function (req, res, next) {
  Category.findById(req.params.id, function (err, category) {
    if (err)return next(err);
    Item.paginate({
      categories: category.title,
      type: 'MOVIE',
    }, {
      select: 'id title categories poster',
      sort: {createdAt: 1},
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.size ? parseInt(req.query.size) : 32
    }, function (err, movies) {
      if (err) return next(err);
      res.json({
        category: category,
        movies: movies
      });
    })
  });
});

router.get('/:id/serie', function (req, res, next) {
  Category.findById(req.params.id, function (err, category) {
    if (err)return next(err);
    Item.paginate({
      categories: category.title,
      type: 'SERIE',
    }, {
      select: 'id title categories poster',
      sort: {createdAt: 1},
      page: req.query.page ? parseInt(req.query.page) : 1,
      limit: req.query.size ? parseInt(req.query.size) : 32
    }, function (err, movies) {
      if (err) return next(err);
      res.json({
        category: category,
        movies: movies
      });
    })
  });
});

router.get('/', function (req, res, next) {
  Category.paginate({}, {
      sort: {title: 1},
      page: 1,
      limit: 1000
  }, function (err, categories) {
    if (err) return next(err);
    res.json(categories);
  })
});

module.exports = router;
