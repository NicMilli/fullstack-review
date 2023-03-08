import React, { useState } from 'react';
import { FaCaretDown, FaUtensils, FaEye, FaStar, FaCaretUp} from "react-icons/fa";

const RepoItem = ({ data }) => {
  const [clicked, setClicked] = useState(false);
  const [repos, setRepos] = useState({});
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([...Array(Math.ceil(data.repos.length / 5) + 1).keys()].slice(1));

  const handleClick = (e) => {
    setRepos(data.repos.slice((page * 5) - 5, (page * 5)));
    setClicked(prevState => !prevState);
  }

  const handlePage = (pageNum) => {
    setPage(pageNum);
    setRepos(data.repos.slice(((pageNum) * 5) - 5, ((pageNum) * 5)));
  }

  return (
    <div>
      <div className='userInfo'>
        <a href={data.html_url} target="_blank" className='clickable link'>
          <img className='avatar' src={data.avatar_url} alt='avatar'/>
          <h2>{data.username}</h2>
        </a>
        <p onClick={handleClick} className='clickable view'> View Repos {clicked ? <FaCaretUp/> : <FaCaretDown/>}</p>
      </div>
      {clicked ? <div > {repos.map((repo) => {
        return (
        <div key={repo.id} className='repoList'>
          <a href={repo.html_url} target="_blank" className='clickable link repoItem'>{repo.name}</a>
          <p className='repoItem'><FaUtensils /> {repo.forks}</p>
          <p className='repoItem'><FaEye/> {repo.watchers}</p>
          <p className='repoItem'><FaStar/> {repo.stargazers_count}</p>
        </div>)
      })} <div className='pageList'>
        {pages.map((pageNo) => <p key={pageNo} onClick={(e) => {handlePage(pageNo)}} className={pageNo === page ? 'current clickable paginate' : 'clickable paginate'}>{pageNo}</p>)}
      </div>

      </div> : null}
    </div>
  )
}

export default RepoItem;