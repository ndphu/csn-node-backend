var express = require('express');
var router = express.Router();
var Track = require('../../models/csn/Track');

router.get('/:id', function (req, res, next) {
  Track.findById(req.params.id, function (err, track) {
    if (err) return next(err);
    res.json(track);
  })
});

module.exports = router;
