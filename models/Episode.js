var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var EpisodeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  videoSource: String,
  serieId: String
});

EpisodeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Episode', EpisodeSchema, 'episodes');