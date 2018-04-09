var express = require('express');
var router = express.Router();
var Actor = require('../models/Actor');

router.get('/:id', function (req, res, next) {
  Actor.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

module.exports = router;
