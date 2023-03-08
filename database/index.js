const mongoose = require('mongoose');
const Promise = require('bluebird');
const { MongoClient, ServerApiVersion } = require('mongodb');

if (process.env.MODE === 'production') {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
    console.log('MONGO connection error')
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
} else {
  mongoose.connect('mongodb://localhost/fetcher');
}


const db = client || mongoose.connection;

let repoSchema = mongoose.Schema({
  name: String,
  id: {
    type: Number,
    unique: true
  },
  forks: Number,
  stargazers_count: Number,
  watchers: Number,
  html_url: String
});

let userSchema = mongoose.Schema({
  username: String,
  id: {
    type: Number,
    unique: true
  },
  avatar_url: String,
  html_url: String,
  repos: [repoSchema]
});

let Repo = mongoose.model('Repo', userSchema);
let User = mongoose.model('User', userSchema);

let save = (repos) => {
  repos.sort((a, b) => {
    if (a.stargazers_count + a.forks > b.stargazers_count + b.forks) {
      return -1;
    } else if (a.stargazers_count + a.forks > b.stargazers_count + b.forks) {
      return 1;
    } else {
      return 0;
    }
  });

  let username = repos[0].owner.login;
  let userId = repos[0].owner.id;
  let url = repos[0].owner.html_url;
  let avatar = repos[0].owner.avatar_url;

    let user = new User({
    username: username,
    id: userId,
    repos: repos,
    avatar_url: avatar,
    html_url: url
    });

    return user.save(function(e) {
      return User.updateOne({ username }, {
        repos: repos, avatar_url: avatar, html_url: url}).exec();
    });
}

let find = (username) => {
  let user = User.findOne({ username: username }).exec();

    return user;
}

let findAll = (username) => {
  let users = User.find({}).exec();

    return users;
}

module.exports.find = find;
module.exports.findAll = findAll;
module.exports.save = save;