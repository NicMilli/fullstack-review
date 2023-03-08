const axios = require('axios');
const config = process.env.TOKEN || require('../config.js').TOKEN;

let getReposByUsername = ({username}) => {

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    method: 'get',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config}`,
    }
  };
  return axios(options);

}

module.exports.getReposByUsername = getReposByUsername;