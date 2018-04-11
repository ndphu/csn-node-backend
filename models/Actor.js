var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ActorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  key: String,
  title: String
});

ActorSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Actor', ActorSchema, 'actors');