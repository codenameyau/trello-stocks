const request = require('request');

const requestPromise = exports.requestPromise = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, res, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data))
      }
    });
  });
};

const serializeQuery = exports.serializeQuery = (object) => {
  return '?' + Object.keys(object).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
  }).join('&');
};
