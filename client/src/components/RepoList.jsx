import React from 'react';
import RepoListItem from './RepoListItem.jsx';

// const RepoList = (props) => (
//   <div>
//     <h4> Repo List Component </h4>
//     There are {props.repos.length} repos.
//   </div>
// )

const RepoList = ({repos, urlClickHandler}) => (
  <div>
    <h4> Repo List Component </h4>
    <table>
      <tbody>
      {repos.map((repo) => {
        return (
          <RepoListItem repo={repo} urlClickHandler={urlClickHandler}/>
        )
      })}
      </tbody>
    </table>
    <p>There are {repos.length} repos.</p>
  </div>
)

export default RepoList;