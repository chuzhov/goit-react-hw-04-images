import css from 'components/ImageGalleryItem/ImageGalleryItem.module.css';

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

export default ImageGalleryItem;
