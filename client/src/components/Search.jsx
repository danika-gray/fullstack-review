import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    let currentTerm = this.state.term + e.target.value; // should copy old term
    // and update it with new input values
    this.setState({
      term: currentTerm
    });
  }

  search() {
    this.props.onSearch(this.state.term);

    // reset state to empty
    this.setState({
      term: ''
    });
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange}/>
      <button onClick={this.search}> Add Repos </button>
    </div>)
  }
}

export default Search;