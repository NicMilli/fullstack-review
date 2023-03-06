const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB successfully');
});

let repoSchema = mongoose.Schema({
  username: String,
  title: String,
  description: String,
  starCount: Number,
  forkCount: Number,
  url: String
});

repoSchema.methods.order = function() {
  this.repos.filter((a, b) => {
    if (a.stars > b.stars) {
      return -1;
    } else if (a.stars > b.stars) {
      return 1;
    } else {
      return 0;
    }
  })
};

let Repo = mongoose.model('Repo', repoSchema);
Repo.order();

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;