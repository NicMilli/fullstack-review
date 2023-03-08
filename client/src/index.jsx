import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';
import './index.css';
import { FaCaretDown, FaUtensils, FaEye, FaStar, FaCaretUp} from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [pageRepos, setPageRepos] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    axios.get('/allrepos').then((response) => {
      if (Array.isArray(response.data)) {
        setUsers(response.data);
        let newRepos = [];
        response.data.map((user) => {
          newRepos = newRepos.concat(user.repos);
        });
        newRepos.sort((a, b) => {
          if (a.stargazers_count + a.forks > b.stargazers_count + b.forks) {
            return -1;
          } else if (a.stargazers_count + a.forks > b.stargazers_count + b.forks) {
            return 1;
          } else {
            return 0;
          }
        })
        setRepos(newRepos.slice(0, 25));
        setPageRepos(newRepos.slice(0, 5));
        toast.success('Users and repos fetched successfully');
      }

    }).catch((e) => {
      toast.error('Unable to fetch users and repos!');
    });

    if (update) {
      setUpdate(false);
    }
  }, [])

  const search = (term) => {
    const results = axios.post('/repos', {
      username: term
  }, { headers: { "Content-Type": "application/json" } })
    .then(function() {
      setUpdate(true);
      toast.success('New user and repos added!');
    }).catch((e) => {
      toast.error(`Unable to find user: ${e.message}`)
    });

  };

  const handlePage = (pageNum) => {
    setPage(pageNum);
    setPageRepos(repos.slice(((pageNum) * 5) - 5, ((pageNum) * 5)));
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <div>
        <Search onSearch={search}/>
        <p className='clickable' onClick={() => {setClicked(prevState => !prevState)}}>Overall top 25! {clicked ? <FaCaretUp/> : <FaCaretDown/>}</p>
        {clicked ? <div> {pageRepos.map((repo) => { return ( <div key={repo.id} className='repoList'>
                <a href={repo.html_url} target="_blank" className='clickable link repoItem'>{repo.name}</a>
                <p className='repoItem'><FaUtensils /> {repo.forks}</p>
                <p className='repoItem'><FaEye/> {repo.watchers}</p>
                <p className='repoItem'><FaStar/> {repo.stargazers_count}</p>
              </div>
            )
          })}
           <div className='pageList'>
        {pages.map((pageNo) => <p key={pageNo} onClick={(e) => {handlePage(pageNo)}} className={pageNo === page ? 'current clickable paginate' : 'clickable paginate'}>{pageNo}</p>)}
      </div>
      </div> : null}
        <RepoList users={users}/>
      </div>
      <ToastContainer />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));