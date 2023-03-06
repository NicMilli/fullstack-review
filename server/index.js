const express = require('express');
let app = express();
var path = require('path');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
console.log(path.join(__dirname, '../client/dist'))
app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.post('/repos', function (req, res) {
  console.log('POST req made', req.body);
  res.send('res')
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  console.log('GET req made');
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

