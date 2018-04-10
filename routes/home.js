var express = require('express');
var Movie = require('../models/Movie');
var Category = require('../models/Category');

var router = express.Router();

router.get('/', function (req, res, next) {
  const sections = [];
  Category.paginate({}, {
    sort: {key: 1},
    limit: 7
  }, function (err, result) {
    var promises = result.docs.map(function (category) {
      return new Promise(function (resolve, reject) {
        Movie.paginate(
          {'categories': category.title},
          {
            select: 'id title poster categories',
            limit: 10
          }, function (err, movies) {
            if (err) {
              reject(err)
            } else {
              sections.push({
                category: category,
                movies: movies.docs
              });
              resolve();
            }
          });
      })
    });
    
    Promise.all(promises).then(function () {
      res.json(sections);
    }).catch(console.err);
  });
  
});

module.exports = router;
