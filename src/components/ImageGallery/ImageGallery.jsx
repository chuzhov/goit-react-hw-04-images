import css from 'components/ImageGallery/ImageGallery.module.css';
import { Component } from 'react';
import axiosFetchPictures from 'utils/api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

class ImageGallery extends Component {
  state = {
    images: [],
    currentPage: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  static PER_PAGE = 12;

  async componentDidUpdate(prevProps, prevState) {
    debugger;
    try {
      if (
        this.props.query !== prevProps.query ||
        this.state.page !== prevState.page
      ) {
        this.setState({ isLoading: true });

        const { hits, totalHits } = await axiosFetchPictures(
          this.props.query,
          this.state.currentPage,
          ImageGallery.PER_PAGE
        );

        this.setState({
          images: [...this.state.images, ...hits],
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

  render() {
    const items = this.state.images;

    return (
      <ul className={css['gallery']}>
        {items.map(item => (
          <ImageGalleryItem
            key={item.id}
            url={item.previewURL}
            alt={item.tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
