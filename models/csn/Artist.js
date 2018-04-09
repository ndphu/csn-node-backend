var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ArtistSchema = new mongoose.Schema({
  title: String
});

ArtistSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Artist', ArtistSchema, 'artists');