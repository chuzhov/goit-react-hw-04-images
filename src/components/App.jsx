import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    query: '',
    hasMore: false,
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
      <div>
        <SearchBar getQuery={this.getQuery} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
