const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to MongoDB successfully');
});

let repoSchema = mongoose.Schema({
  title: String,
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
  repos: [repoSchema],
})

// userSchema.methods.order = function() {
//   this.repos.sort((a, b) => {
//     if (a.stargazers_count > b.stargazers_count) {
//       return -1;
//     } else if (a.stargazers_count > b.stargazers_count) {
//       return 1;
//     } else {
//       return 0;
//     }
//   })
// };

let Repo = mongoose.model('Repo', userSchema);
let User = mongoose.model('User', userSchema);

let save = (repos) => {
  repos.sort((a, b) => {
    if (a.stargazers_count > b.stargazers_count) {
      return -1;
    } else if (a.stargazers_count > b.stargazers_count) {
      return 1;
    } else {
      return 0;
    }
  })

  //Check if user exists?
  let username = repos[0].owner.login;
  let userId = repos[0].owner.id;

    let user = new User({
    username: username,
    id: userId,
    repos: repos
    });
    user.save(function(e) {
      User.findOneAndUpdate({ username: 'NicMilli' }, {repos: repos})
      .then(() => {

      })
    });


}

let find = () => {
  let user = User.findOne({ username: 'NicMilli' }).exec()

    //user.order();
    return user;

}

module.exports.find = find;
module.exports.save = save;