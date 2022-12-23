import css from 'components/ImageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
//import { Oval } from 'react-loader-spinner';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <ul className={css['gallery']}>
      {images.map(item => (
        <ImageGalleryItem
          key={'key-' + item.id}
          url={item.previewURL}
          alt={item.tags}
          largeURL={item.largeImageURL}
          onOpenModal={onOpenModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
