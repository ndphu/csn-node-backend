var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var EpisodeSchema = new mongoose.Schema({
  title: String,
  serieId: String
});

EpisodeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Episode', EpisodeSchema, 'episodes');