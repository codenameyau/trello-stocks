const request = require('request');

url = 'https://api.robinhood.com/fundamentals/?symbols=PYPL'

request(url, (err, res, body) => {
  console.log(body);
});

const requestRH = async (url) => {
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
      resolve(body);
    });
  });
};

const main = async () => {
  const data = await requestRH(url);
  console.log(data);
};

main();
