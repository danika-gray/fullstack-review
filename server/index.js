const express = require('express');
let app = express();

// add express things to use req.body.username
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(express.static(__dirname + '/../client/dist'));

// import other needed functionality in helpers/github.js and database/index.js
const helpers = require('../helpers/github.js');
const db = require('..database/index.js');

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  helpers.getReposByUsername(req.body.username, (err, githubData) => {
    if (err) {
      res.status(404).res.end(); // yeah?
    } else {
      let repos = github.Data.map((repo) => {
        // object with fields
        console.log(repo, 'repo');
      });
      // repos = repos.unique
      // send to db; { username: username, userid: userid, repos: []} something like this?
      // db.save(userObj, callback);
      // callback should send confirmation back to end user with res.end or res.send?
      // i think it should send the formatted array that was stored
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

