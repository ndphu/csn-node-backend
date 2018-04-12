var feignjs = require('feignjs');
var RequestClient = require('./feing-node-custom');

var vungTvDescription = {
  search: {
    method: 'POST',
    uri: '/ajax/search',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
};

var vungTvClient = feignjs.builder()
  .client(new RequestClient({
    defaults: {
      headers: {
        Origin: 'http://vung.tv',
        Referer: 'http://vung.tv',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      }
    }
  }))
  .target(vungTvDescription, 'http://vung.tv');

module.exports = vungTvClient;