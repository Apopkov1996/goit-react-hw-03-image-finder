import React from 'react';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
