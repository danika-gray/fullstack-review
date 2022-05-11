const express = require('express');

// import helpers/github.js and database/index.js
const helpers = require('../helpers/github.js');
const database = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));

// express requirements for using req.body.username
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body.username, (err, githubData) => {
    if (err) {
      res.setStatus(500).res.send({error: err});

    } else {
      let repos = githubData.map(({ id, name, html_url, stargazers_count, owner }) => {
        // object with fields
        //console.log(repo, 'repo');

        let repoObj = { id, name, html_url, stargazers_count };
        repoObj.userID = owner.id;
        repoObj.username = owner.login;

        //console.log(repoObj, 'repoObj');
        return repoObj;
      });
      //console.log('REPOS', repos);

      // let repoFilterObj = {};
      // let duplicateRepos = [];
      // repos.forEach((repo) => {
      //   if (repoFilterObj[repo.id] === undefined) {
      //     repoFilterObj[repo.id] = 1;
      //   } else {
      //     duplicateRepos.push(repo);
      //   }
      // });

      //console.log(repoFilterObj);
      //console.log(duplicateRepos);

      // repos = repos.filter((repo) => {
      //   if (duplicateRepos.indexOf(repo) === -1) {
      //     return true;
      //   }
      // });
      //console.log('REPOS AFTER FILTER', repos);

      // send repos array to database for storage
      database.save(repos, (err, result) => {
        if (err) {
          res.setStatus(500).res.send({err: 'unable to save data'});

        } else {
          console.log(result, 'result');
          // repos.sort((a, b) => (a.stargazers_count > b.stargazers_count) ? -1 : 1);
          // console.log(repos, 'repos after sort');
          // if (repos.length > 25) {
          //   repos = repos.slice(0, 25);
          // };

          res.send({result: result});
        }
      });
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  // query the database
  database.Repo.find({})
    .sort('-stargazers_count')
    .limit(25)
    .exec()
    .then((data) => {
      //console.log(data, 'data', data.length, 'length');
      res.send(data);
    })
    .catch((err) => {
      res.setStatus(500).send({error: err});
    }); // should find all documents then sort or catch
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

