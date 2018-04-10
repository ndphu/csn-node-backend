var express = require('express');
var router = express.Router();
var Serie = require('../models/Serie');
var Episode = require('../models/Episode');

router.get('/:id', function (req, res, next) {
  Serie.findById(req.params.id, function (err, serie) {
    if (err) return next(err);
    Episode.paginate({
      serieId: req.params.id
    },{
      sort: {order: 1}
    },function (err, episodes) {
      res.json({
        serie: serie,
        episodes: episodes.docs
      });
    });
  });
});

module.exports = router;
