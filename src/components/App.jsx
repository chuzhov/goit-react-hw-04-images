import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    gallery: [],
    query: '',
    isLoading: false,
    error: null,
  };

  getQuery = newQuery => {
    this.setState(() => {
      if (this.state.query !== newQuery) return { query: newQuery };
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SearchBar getQuery={this.getQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
