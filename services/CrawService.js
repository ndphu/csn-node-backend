const crawClient = require('../client/CrawClient');

class CrawService {
  crawEpisode(episode) {
    const postData = JSON.stringify([{
      id: episode._id ? episode._id : '',
      input: episode.crawUrl,
    }]);
    return crawClient.craw(postData);
  }

  crawUrl(url) {
    console.log('craw url ' + url);
    const postData = JSON.stringify([{
      id: new Date().getTime() + '',
      input: url,
    }]);
    return new Promise((resolve, reject) => {
      crawClient.craw(postData).then(result => {
        resolve(JSON.parse(result)[0]);
      }).catch(reject)
    });
  }
}


const crawService = new CrawService();
module.exports = crawService;