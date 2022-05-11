import React from 'react';
import RepoListItem from './RepoListItem.jsx';

// const RepoList = (props) => (
//   <div>
//     <h4> Repo List Component </h4>
//     There are {props.repos.length} repos.
//   </div>
// )

const RepoList = ({repos}) => (
  <div>
    <h4> Repo List Component </h4>
    {repos.map((repo) => {
      return (
        <RepoListItem repo={repo}/>
      )
    })}
    <p>There are {repos.length} repos.</p>
  </div>
)

export default RepoList;