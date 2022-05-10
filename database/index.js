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
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // let id = data.id;

  // try {
  //   let name = data.name;
  //   name = new Repo(data);
  //   let savedRepo = await doc.save();
  //   if (savedRepo.id === data.id) {
  //     callback(null, 'saved!');
  //   }
  // } catch {
  //   callback(err, null); // err is not defined
  // }

  // map every value in schema and assign to correct data point
  // using mongo db documentation!

}

module.exports.save = save;