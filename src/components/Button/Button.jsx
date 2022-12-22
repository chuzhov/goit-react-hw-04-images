import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClickHandler }) => {
  return (
    <div className={css['add-more__wrapper']} onClick={onClickHandler}>
      <button type="button" className={css['button']}>
        Load more...
      </button>
    </div>
  );
};

Button.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default Button;
