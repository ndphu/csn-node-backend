var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var mongoDB = 'mongodb://19november.freeddns.org:5050/csndb';
mongoose.connect(mongoDB);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected!');
});

module.exports = db