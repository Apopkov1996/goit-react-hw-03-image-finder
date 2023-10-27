import React from 'react';
import {
  StyledSearchbar,
  StyledForm,
  StyledSearchBtn,
  StyledFormInput,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export class Searchbar extends React.Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query.trim());
    this.setState({ query: '' });
  };

  render() {
    return (
      <StyledSearchbar className="searchbar">
        <StyledForm onSubmit={this.handleSubmit} className="form">
          <StyledSearchBtn type="submit" className="button">
            <span className="button-label">Search</span>
          </StyledSearchBtn>
          <StyledFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </StyledForm>
      </StyledSearchbar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
