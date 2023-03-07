const express = require('express');
let app = express();
var path = require('path');
const helpers = require('../helpers/github')
const db = require('../database/index')

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
console.log(path.join(__dirname, '../client/dist'))
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body)
  .then((response) => {
    db.save(response.data)
    // .then(() => {
    //   res.sendStatus(201);
    // })
    // .catch((e) => {
    //   console.log('then')
    //   res.sendStatus(401);
    // })
    res.sendStatus(201);
  })
  .catch((e) => {
    res.status(404);
    res.send('Username not found!');
  });

  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  db.find(req.query.user)
  .then((data) => {
      res.status(201);
      res.send(data.repos.slice(0, 25));
  })
  .catch((e) => {
    res.send('Could not find the requested user');
  });

});
app.get('/allrepos', function (req, res) {
  db.findAll()
  .then((data) => {
    res.status(201);
    res.send(data);
  })
  .catch((e) => {
    res.send('Could not find the requested user');
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

