import css from 'components/ImageGalleryItem/ImageGalleryItem.module';

const ImageGalleryItem = ({ url, alt }) => {
  return (
    <li className={css['item']}>
      <img src={url} width="240" alt={alt} />
    </li>
  );
};

export default ImageGalleryItem;
