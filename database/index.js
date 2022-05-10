const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: String,
  name: String,
  html_url: String,
  username: String, // track who a particular repo belongs to
  userID: String,
  stargazers_count: Number
});

// in theory perhaps I can search repoSchema.repo_owner to get all repo objects with
// that person's username but this may require refactoring.
// another idea is to store one username in each repoSchema and keep an array of objects
// of all of that person's repos.

let Repo = mongoose.model('Repo', repoSchema);

let save = async (data, callback) => {
  console.log('here in save');
  console.log(data);
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // let id = data.id;

  let repos = data.map((dataObj) => {
    return new Repo({
      id: dataObj.id,
      name: dataObj.name,
      html_url: dataObj.html_url,
      username: dataObj.username, // track who a particular repo belongs to
      userID: dataObj.userID,
      stargazers_count: dataObj.stargazers_count
    });
  });

  repos = repos.map(async (repo) => {
    return repo.save();
  });

  console.log(repos);
  Promise.all(repos)
    .then(callback(null, 'saved'));

// map every value in schema and assign to correct data point
// using mongo db documentation!

}

module.exports.save = save;