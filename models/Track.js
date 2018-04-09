var mongoose = require('mongoose');

var TrackSchema = new mongoose.Schema({
  title: String,
  artists: String,
  link: String,
  quality: String,
  duration: Number
});

module.exports = mongoose.model('Track', TrackSchema);