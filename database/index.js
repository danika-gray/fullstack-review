const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: String,
  repo_name: String,
  repos_url: String,
  repo_owner: String, // track who a particular repo belongs to
  stargazers_count: Number
});
// in theory perhaps I can search repoSchema.repo_owner to get all repo objects with
// that person's username but this may require refactoring.
// another idea is to store one username in each repoSchema and keep an array of objects
// of all of that person's repos.

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;