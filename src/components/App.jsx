import React, { Component } from 'react';
import SearchBar from './SearchBar/SearchBar';
import axiosFetchPictures from 'utils/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    currentPage: 1,
    totalHits: 0,
    isModalOpened: false,
    modalData: { imageURL: '', alt: '' },
    isLoading: false,
    error: null,
  };

  getQuery = newQuery => {
    this.setState(() => {
      if (this.state.query !== newQuery) return { query: newQuery };
    });
  };

  static PER_PAGE = 12;

  async componentDidUpdate(prevProps, prevState) {
    const isNewQuery = this.state.query !== prevState.query;

    try {
      if (isNewQuery || this.state.currentPage !== prevState.currentPage) {
        this.setState({ isLoading: true });
        isNewQuery && this.setState({ currentPage: 1 });

        const { hits, totalHits } = await axiosFetchPictures(
          this.state.query,
          this.state.currentPage,
          App.PER_PAGE
        );

        const arr = isNewQuery || totalHits === 0 ? [] : this.state.images;

        this.setState({
          images: [...arr, ...hits],
          totalHits,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false, error: error, isModalOpened: true });
    }
  }

  increasePageNumber = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  openModal = event => {
    this.setState({
      isModalOpened: true,
      modalData: {
        imageURL: event.currentTarget.id,
        alt: event.currentTarget.alt,
      },
    });
  };

  closeModal = () => {
    this.setState({ isModalOpened: false, error: null });
  };

  render() {
    return (
      <div>
        <SearchBar getQuery={this.getQuery} />
        <ImageGallery images={this.state.images} onOpenModal={this.openModal} />
        {this.state.currentPage * App.PER_PAGE < this.state.totalHits && (
          <Button onClickHandler={this.increasePageNumber} />
        )}
        {this.state.isModalOpened && (
          <Modal closeModal={this.closeModal}>
            <img
              src={this.state.modalData.imageURL}
              alt={this.state.modalData.alt}
            />
          </Modal>
        )}
        {this.state.isModalOpened && this.state.error && (
          <Modal closeModal={this.closeModal}>
            <div className={css['error']}>
              <p>Error during getting data from server:</p>
              <h2>{this.state.error.message}</h2>
              <p>Please, press ESC to continue</p>
            </div>
          </Modal>
        )}
        {this.state.isLoading && (
          <Modal
            closeModal={() => {
              if (!this.state.isLoading) {
                this.setState({ isModalOpened: false });
              }
            }}
          >
            <div className={css['spinner']}>
              <p>Loading...</p>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
