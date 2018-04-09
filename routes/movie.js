var express = require('express');
var router = express.Router();
var Movie = require('../models/Movie');

router.get('/:id', function (req, res, next) {
  Movie.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

module.exports = router;
