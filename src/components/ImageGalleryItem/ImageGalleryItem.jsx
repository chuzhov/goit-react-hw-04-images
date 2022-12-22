import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, alt, largeURL, onOpenModal }) => {
  return (
    <li
      id={largeURL}
      className={css['item']}
      data={largeURL}
      onClick={event => onOpenModal(event)}
    >
      <img src={url} width="240" alt={alt} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
