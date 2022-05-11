const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true}, // prevent re-storing the same data
  name: String,
  html_url: String,
  username: String,
  userID: String,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = async (data, callback) => {
  // console.log('here in save');
  // console.log(data);

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

  repos = repos.map((repo) => {
    return repo.save();
  });

  //console.log(repos);
  Promise.all(repos)
    .then(callback(null, 'saved'))
    .catch((err) => callback(err, null));

// map every value in schema and assign to correct data point
// using mongo db documentation!

}

module.exports.save = save;
module.exports.Repo = Repo;