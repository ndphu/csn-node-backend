const express = require('express');
const router = express.Router();
const Actor = require('../models/Actor');
const Movie = require('../models/Movie');
const Serie = require('../models/Serie');
const Item = require('../models/Item');
const vungTvClient = require('../client/VungTv');
const cheerio = require('cheerio');
const cookieService = require('../services/CookieService');
const crypto = require('crypto');

router.get('/q/:query', function (req, res, next) {
  const query = req.params.query;
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.size ? parseInt(req.query.size) : 32;

  const response = {};
  const promises = [];

  promises.push(new Promise(function (resolve) {
    Actor.paginate({
      title: new RegExp('.*' + query + '.*', 'i')
    }, {
      sort: {title: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.actor = resp;
      resolve();
    });
  }));

  promises.push(new Promise(function (resolve) {
    Movie.paginate({
      normTitle: new RegExp('.*' + query + '.*', 'i')
    }, {
      select: 'id title poster categories',
      sort: {normTitle: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.movie = resp;
      resolve();
    });
  }));

  promises.push(new Promise(function (resolve) {
    Serie.paginate({
      title: new RegExp('.*' + query + '.*', 'i')
    }, {
      select: 'id title poster categories',
      sort: {normTitle: 1},
      page: page,
      limit: limit
    }, function (err, resp) {
      response.serie = resp;
      resolve();
    });
  }));

  Promise.all(promises).then(function () {
    res.json(response);
  })
});


router.get('/remote/q/:query', function (req, res, next) {
  const query = req.params.query;
  const postData = 'status=search_page&q=' + query;
  console.log(cookieService.getCookieHeader());
  console.log(postData);

  vungTvClient.search(postData).then((result) => {
    const items = [];
    const $ = cheerio.load(JSON.parse(result).data_html);
    $('.film-small').each(function () {
      const a = $(this);
      items.push({
        title: a.find('.title-film-small .title-film').text(),
        subTitle: a.find('.title-film-small p').text(),
        poster: a.find('.poster-film-small').attr('style').split(/[()]/)[1],
        link: a.attr('href')
      })
    });

    const promises = items.map(item => new Promise((resolve, reject) => {
      const hash = crypto.createHash('md5').update(item.link).digest("hex");
      Item.find({hash: hash}, function (err, items) {
        if (err) {
          reject(err);
        } else {
          resolve({
            title: item.title,
            subTitle: item.subTitle,
            poster: item.poster,
            link: item.link,
            itemId: items.length > 0 ? items[0]._id : null,
          })
        }
      })
    }));
    Promise.all(promises).then(items => res.send(items));
  }).catch((reason) => {
    console.log(reason);
    res.status(500);
    res.send({
      query: query,
      err: reason
    })
  })
});

module.exports = router;
