const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = ({username}) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'get',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    }
  };
  return axios(options);

}

module.exports.getReposByUsername = getReposByUsername;