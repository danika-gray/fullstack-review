const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    url: path.join('https://api.github.com/users/', username),
    // results in https://api.github.com/users/octocat if username=octocat
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  axios.get(options.url, { 'headers': options.headers }).
    .then((res) => {
      console.log(res.data, 'res.data'); // expect a complex array of objects with nested objects
      callback(null, res.data); // send back data or format here?
    })
    .catch((err) => {
      callback(err, null);
    });

}

module.exports.getReposByUsername = getReposByUsername;