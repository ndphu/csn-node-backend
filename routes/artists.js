var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200);
  res.send({status: 'OK'});
});

router.get('/byName/:artistName/tracks', function (req, res, next) {
  res.status(200);
  res.send({status: req.params.artistName})
});

module.exports = router;
