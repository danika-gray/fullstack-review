const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

// express requirements for using req.body.username
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// import helpers/github.js and database/index.js
const helpers = require('../helpers/github.js');
const database = require('../database/index.js');

app.post('/repos', function (req, res) {
  console.log(req.body.username, 'req.body.username in server/index.js');
  // ^^ this is working as expected

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  helpers.getReposByUsername(req.body.username, (err, githubData) => {
    if (err) {
      res.end();
    } else {
      let repos = github.Data.map((repo) => {
        // object with fields
        console.log(repo, 'repo');

        let repoObj = { id, name, html_url, stargazers_count };
        repoObj.userID = repo.owner.id;
        repoObj.username = repo.owner.name;

        return repoObj;
      });
      let repoFilterObj = {};
      let duplicateRepos = [];
      repos.forEach((repo) => {
        if (repoFilterObj[repo.id] === undefined) {
          repoFilterObj[repo.id] = 1;
        } else {
          duplicateRepos.push(repo);
        }
      });

      console.log(repoFilterObj);
      console.log(duplicateRepos);

      repos = repos.filter((repo) => {
        if (duplicateRepos.indexOf(repo) === -1) {
          return true;
        }
      });

      // send repos array to database for storage
      database.save(repos, (err, result) => {
        if (err) {
          res.end();
        } else {
          // repos have been saved
          // send back repos to be displayed in index.jsx
          res.status(201).res.send(repos);
        }
      });
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

