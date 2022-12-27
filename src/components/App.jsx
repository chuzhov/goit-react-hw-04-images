import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import axiosFetchPictures from 'utils/api';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ imageURL: '', alt: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getQuery = newQuery => {
    if (newQuery !== query) {
      setQuery(newQuery);
    }
  };

  const PER_PAGE = 12;

  useEffect(() => {
    if (!query) return;
    const setSearchNews = () => {
      setIsLoading(true);
      axiosFetchPictures(query, currentPage, PER_PAGE)
        .then(({ hits, totalHits }) => {
          setImages(images =>
            currentPage === 1 ? hits : [...images, ...hits]
          );
          currentPage === 1 && setTotalHits(totalHits);
        })
        .catch(err => {
          setError(err);
          setModalOpen(true);
        })
        .finally(() => setIsLoading(false));
    };
    setSearchNews();
  }, [query, currentPage]);

  const increasePageNumber = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const openModal = event => {
    setModalOpen(true);
    setModalData({
      imageURL: event.currentTarget.id,
      alt: event.currentTarget.alt ?? event.target.alt,
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleCloseModal);
      document.getElementById('backdrop').addEventListener('click', closeModal);
    }

    return () => {
      if (isModalOpen) {
        window.removeEventListener('keydown', handleCloseModal);
        document
          .getElementById('backdrop')
          .removeEventListener('click', closeModal);
      }
    };
  }, [isModalOpen]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      setModalOpen(false);
      setError(null);
    }
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
