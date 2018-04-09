var express = require('express');
var router = express.Router();
var Serie = require('../models/Serie');

router.get('/:id', function (req, res, next) {
  Serie.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

module.exports = router;
