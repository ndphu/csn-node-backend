var express = require('express');
var router = express.Router();
var Episode = require('../models/Episode');

router.get('/:id', function (req, res, next) {
  Episode.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

router.put('/:id/videoSource', function (req, res, next) {

});

module.exports = router;
