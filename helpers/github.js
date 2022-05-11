const axios = require('axios');
const config = require('../config.js');
const path = require('path');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    // results in https://api.github.com/users/octocat if username=octocat
    // should be /repos
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  //console.log(options.url); // working
  //console.log(options.headers); // working

  axios.get(options.url, options)
    .then((res) => {
      //console.log(res.data, 'res.data'); // expect a complex array of objects with nested objects
      callback(null, res.data); // send back data to index.js
    })
    .catch((err) => {
      console.log('error!');
      callback(err, null);
    });
}

module.exports.getReposByUsername = getReposByUsername;