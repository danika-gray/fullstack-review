const axios = require('axios');
const config = require('../config.js');
const path = require('path');

let getReposByUsername = (username, callback) => {
  let options = {
    url: path.join('https://api.github.com/users/', username),
    // results in https://api.github.com/users/octocat if username=octocat
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  console.log(options.url); // working
  console.log(options.headers); // working

  axios.get(options.url, { 'headers': options.headers })
    .then((res) => {
      console.log(res.data, 'res.data'); // expect a complex array of objects with nested objects
      callback(null, res.data); // send back data to index.js
    })
    .catch((err) => {
      callback(err, null);
    });
}

module.exports.getReposByUsername = getReposByUsername;