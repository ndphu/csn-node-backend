var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ActorSchema = new mongoose.Schema({
  title: String,
  key: String
});

ActorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Actor', ActorSchema, 'actors');