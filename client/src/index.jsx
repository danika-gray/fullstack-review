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
    //this.urlClickHandler.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData(term) {
    // send get request whenever invoked
    $.get(`/repos/${term}`, (data) => {
      this.setState({
        repos: data
      })
    }, 'json');
  }

  componentDidMount() {
    this.getData();
    // new function for get request
    // invoke get request function after componentDidMount
    // and after data is posted
  }

  search (term) {
    console.log(`${term} was searched`);
    //console.log({'username': term}, 'json data to send');

    // $.post('/repos', {'username': term}, (data) => {
    //   console.log(data, 'data'); // note, may need to parse?? but i dont think so
    //   // should be an array of repo objects associated with the searched user
    //   this.setState({
    //     repos: data
    //     // data should be the top 25 posts, as an array of objects
    //   })
    // }, 'json');

    // look for success for jquery .post

    $.post('/repos', {'username': term})
      .done((data) => {
      console.log(data, 'data');
      this.getData(term);
      // should be able to use getData in here
      // or invoke getData with this anon function
      // should be an array of repo objects associated with the searched user
    })
    .fail((err) => {
      alert('post failed');
    })
  }

  urlClickHandler(event) {
    console.log(event.target.value, 'clicked');
    $.get(`/repos/${event.target.value}`);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} urlClickHandler={this.urlClickHandler}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));