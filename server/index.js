const express = require('express');
let app = express();
var path = require('path');
const helpers = require('../helpers/github')
const db = require('../database/index')

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));


app.post('/repos', function (req, res) {
  helpers.getReposByUsername(req.body)
  .then((response) => {
    return db.save(response.data);
  }).then(() => {
      res.sendStatus(201);
    })
  .catch((e) => {
    console.log(e)
    res.status(404);
    res.send('Username not found!');
  });

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

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

