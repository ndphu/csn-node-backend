var express = require('express');
var router = express.Router();
var Artist = require('../models/Artist');
var Track = require('../models/Track');


const sort = {title: 1};

function getOptions(req) {
  var page = 1;
  if (req.query.page) {
    page = parseInt(req.query.page);
  }

  var size = 25;
  if (req.query.size) {
    size = parseInt(req.query.size);
  }

  return {
    page: page,
    limit: size,
    sort: sort
  }
}

router.get('/', function (req, res, next) {
  const options = getOptions(req);

  Artist.paginate({}, {
    options: options
  })
    .then(function (artists) {
      res.send(artists)
    }).catch(function (e) {
    res.status(500);
    res.send({err: e})
  })
});

router.get('/:id/tracks', function (req, res, next) {
  var options = getOptions(req);
  Artist.findById(req.params.id, function (err, artist) {
    if (err) return next(err);
    getTrackByArtistName(artist.title, options, function (tracks, err) {
      if (err) {
        res.error(err)
      } else {
        res.json(tracks)
      }
    });
  })
});

router.get('/byName/:artistName/tracks', function (req, res, next) {
  var options = getOptions(req);
  getTrackByArtistName(req.params.artistName, options, function (tracks, err) {
    if (err) {
      res.error(err)
    } else {
      res.json(tracks)
    }
  });
});

function getTrackByArtistName(artistName, options, callback) {
  Track.paginate({
    artists: new RegExp('.*' + artistName + '.*', 'i')
  }, {
    select: '-link -sources',
    sort: {title: -1},
    page: options.page,
    limit: options.limit
  }).then(function (tracks) {
    callback(tracks, null);
  }).catch(function (e) {
    callback(null, e)
  });
}

router.get('/search/:nameSearch', function (req, res, next) {
  var options = getOptions(req);
  Artist.paginate({
    title: new RegExp('.*' + req.params.nameSearch + '.*', 'i')
  }, {
    sort: {title: -1},
    page: options.page,
    limit: options.limit
  }).then(function (artists) {
    res.json(artists)
  }).catch(function (reason) {
    res.error(reason);
  })
});

module.exports = router;
