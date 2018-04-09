var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var CategorySchema = new mongoose.Schema({
  title: String,
  key: String
});

CategorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', CategorySchema, 'categories');