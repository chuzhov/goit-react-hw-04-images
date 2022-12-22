import css from 'components/ImageGallery/ImageGallery.module.css';
import { Component } from 'react';
import axiosFetchPictures from 'utils/api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    totalHits: 0,
    isModalOpened: false,
    modalData: { imageURL: '', alt: '' },
    isLoading: false,
    error: null,
  };

  static PER_PAGE = 12;

  async componentDidUpdate(prevProps, prevState) {
    const isNewQuery = this.props.query !== prevProps.query;

    try {
      if (isNewQuery || this.state.currentPage !== prevState.currentPage) {
        this.setState({ isLoading: true });
        isNewQuery && this.setState({ currentPage: 1 });

        const { hits, totalHits } = await axiosFetchPictures(
          this.props.query,
          this.state.currentPage,
          ImageGallery.PER_PAGE
        );

        const arr = isNewQuery || totalHits === 0 ? [] : this.state.images;

        this.setState({
          images: [...arr, ...hits],
          totalHits,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      //      toast.error('Something went wrong, please try again later');
      console.log(error);
    } finally {
      //spinner stop
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
    this.setState({ isModalOpened: false });
  };

  render() {
    const items = this.state.images;

    return (
      <>
        <ul className={css['gallery']}>
          {items.map(item => (
            <ImageGalleryItem
              key={'key-' + item.id}
              url={item.previewURL}
              alt={item.tags}
              largeURL={item.largeImageURL}
              onOpenModal={this.openModal}
            />
          ))}
        </ul>
        {this.state.currentPage * ImageGallery.PER_PAGE <
          this.state.totalHits && (
          <Button onClickHandler={this.increasePageNumber} />
        )}
        {this.state.isModalOpened && (
          <Modal closeModal={this.closeModal}>
            <img
              src={this.state.modalData.imageURL}
              alt={this.state.modalData.alt}
              width="480"
            />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGallery;
