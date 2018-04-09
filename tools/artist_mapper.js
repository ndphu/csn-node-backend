require('../db/DB');
var Set = require("collections/set");
var Track = require('../models/Track');
var Artist = require('../models/Artist');

console.log('Hello');
const artistSet = new Set();
Track.find(function (err, tracks) {
  tracks.forEach(function (e) {
    const artists = e.artists.split(";")
    artists.forEach(function (artist) {
      const a = artist.trim();
      if (!artistSet.has(a)) {
        artistSet.add(a);
      }
    });
  });
  artistSet.toArray().forEach(function (artist) {
    const a = new Artist({
      title: artist
    });
    a.save(function (err, result) {
      console.log('saved ' + a + ' with id ' + result._id)
    });
  })
});
