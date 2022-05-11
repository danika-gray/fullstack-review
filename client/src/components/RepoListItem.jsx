import React from 'react';

const RepoListItem = ({repo, urlClickHandler}) => (
  <tr>
    <td>
      {repo.name}
    </td>
    <td>
      <a href="url" onClick={urlClickHandler}>{repo.html_url}</a>
    </td>
  </tr>
);

export default RepoListItem;