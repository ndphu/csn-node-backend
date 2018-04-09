var express = require('express');
var router = express.Router();
var Track = require('../models/Track');


/* GET home page. */
router.get('/', function(req, res, next) {
  Track.find(function (err, tracks) {
    if (err) return next(err);
    res.json(tracks);
  });
});

router.get('/:id', function (req, res, next) {
  Track.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

module.exports = router;
