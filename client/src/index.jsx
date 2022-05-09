import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // when someone searches a term
    // send post request to the server/index file with term
    // when post returns, update this.state.repos with top 25 repos by that username
    $.post('/repos', (data) => {
      console.log(data, 'data'); // note, may need to parse?? but i dont think so
      // should be an array of repo objects associated with the searched user
      this.setState({
        repos: data
      })
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));