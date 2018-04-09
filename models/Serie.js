var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var SerieSchema = new mongoose.Schema({
  title: String
});

SerieSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Serie', SerieSchema, 'series');