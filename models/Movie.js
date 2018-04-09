var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var MovieSchema = new mongoose.Schema({
  title: String,
  views: Number
});

MovieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Movie', MovieSchema, 'movies');