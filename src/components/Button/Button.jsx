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
export default Button;
