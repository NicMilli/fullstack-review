import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = ({ users }) => (
  <div>

    {users.map((user) => {
      return <RepoItem data={user} key={user.id}/>
    })}

  </div>
)

export default RepoList;