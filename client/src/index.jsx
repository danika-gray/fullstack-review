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
    //console.log({'username': term}, 'json data to send');

    $.post('/repos', {'username': term}, (data) => {
      console.log(data, 'data'); // note, may need to parse?? but i dont think so
      // should be an array of repo objects associated with the searched user
      this.setState({
        repos: data
        // data should be the top 25 posts, as an array of objects
      })
    }, 'json');
    // there may be a way to format $.post that is more promise like and uses .done() and .fail()
    // or .error() but I want to make sure this code works/do mvp
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