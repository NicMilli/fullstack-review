import React, { useState } from 'react';
import { FaCaretDown, FaUtensils, FaEye, FaStar, FaCaretUp} from "react-icons/fa";

const RepoItem = ({ data }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    setClicked(prevState => !prevState);
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
      {clicked ? data.repos.map((repo) => {
        return (
        <div key={repo.id} className='repoList'>
          <a href={repo.html_url} target="_blank" className='clickable link repoItem'>{repo.name}</a>
          <p className='repoItem'><FaUtensils /> {repo.forks}</p>
          <p className='repoItem'><FaEye/> {repo.watchers}</p>
          <p className='repoItem'><FaStar/> {repo.stargazers_count}</p>
        </div>)
      }) : null}
    </div>
  )
}

export default RepoItem;