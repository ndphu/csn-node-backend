var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var TrackSchema = new mongoose.Schema({
  title: String,
  artists: String,
  link: String,
  quality: String,
  duration: Number,
  sources: Object
});

TrackSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Track', TrackSchema, 'tracks');