var express = require('express');
var Item = require('../models/Item');
var Category = require('../models/Category');

var router = express.Router();

router.get('/', function (req, res, next) {
  const sections = [];
  Category.paginate({}, {
    sort: {key: 1},
    limit: 7
  }, function (err, result) {
    const promises = result.docs.map(function (section) {
      return new Promise(function (resolve, reject) {
        Item.paginate(
          {'genres': section.title},
          {
            select: 'id title poster genres actors',
            limit: 10
          }, function (err, movies) {
            if (err) {
              reject(err)
            } else {
              sections.push({
                category: section,
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
