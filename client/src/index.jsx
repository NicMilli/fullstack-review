import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    console.log(`${term} was searched`);
    const results = axios.post('/repos', {
      username: term
  }, { headers: { "Content-Type": "application/json" } })
    .then(function() {console.log('search')});

  };

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));