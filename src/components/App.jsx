import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import axiosFetchPictures from 'utils/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const old_state = {
    query: '',
    images: [],
    currentPage: 1,
    totalHits: 0,
    isModalOpened: false,
    modalData: { imageURL: '', alt: '' },
    isLoading: false,
    error: null,
  };

  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ imageURL: '', alt: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQuery = newQuery => {
    setQuery(() => {
      console.log('Old query: ', query);
      console.log('Return: ', query !== newQuery ? newQuery : query);
      debugger;
      return query !== newQuery ? newQuery : query;
    });
    console.log('Result query: ', query);
  };

  const PER_PAGE = 12;

  const getImages = async () => {
    try {
      const { hits, totalHits } = await axiosFetchPictures(
        query,
        currentPage,
        PER_PAGE
      );

      setTotalHits(totalHits);
      return hits;
    } catch (error) {
      setError(error);
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query === '') return;
    setImages(arr => [...getImages()]);
  }, [query]);

  useEffect(() => {
    if (query === '') return;
    setImages(arr => [...arr, ...getImages()]);
  }, [currentPage]);

  // useEffect(async () => {
  //   const isNewQuery = this.state.query !== prevState.query;

  //   try {
  //     if (isNewQuery || this.state.currentPage !== prevState.currentPage) {
  //       this.setState({ isLoading: true });
  //       isNewQuery && this.setState({ currentPage: 1 });

  //       const { hits, totalHits } = await axiosFetchPictures(
  //         this.state.query,
  //         this.state.currentPage,
  //         App.PER_PAGE
  //       );

  //       const arr = isNewQuery || totalHits === 0 ? [] : this.state.images;

  //       setImages(arr => [...arr, ...hits]);
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     setError(error);
  //     setModalOpen(true);
  //   }
  // }, [currentPage, query]);

  const increasePageNumber = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = event => {
    setModalOpen(true);
    setModalData({
      imageURL: event.currentTarget.id,
      alt: event.currentTarget.alt,
    });
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(null);
  };

  return (
    <div>
      <SearchBar getQuery={getQuery} />
      <ImageGallery images={images} onOpenModal={openModal} />
      {currentPage * PER_PAGE < totalHits && (
        <Button onClickHandler={increasePageNumber} />
      )}
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <img src={modalData.imageURL} alt={modalData.alt} />
        </Modal>
      )}
      {isModalOpen && error && (
        <Modal closeModal={closeModal}>
          <div className={css['error']}>
            <p>Error during getting data from server:</p>
            <h2>{error.message}</h2>
            <p>Please, press ESC to continue</p>
          </div>
        </Modal>
      )}
      {isLoading && (
        <Modal
          closeModal={() => {
            if (!isLoading) {
              setModalOpen(false);
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
};
