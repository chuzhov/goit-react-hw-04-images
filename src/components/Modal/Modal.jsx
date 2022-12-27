import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#backdrop');

const Modal = ({ children, handleCloseModal }) => {
  return createPortal(
    <div className={css['backdrop']} onClick={handleCloseModal}>
      <div className={css['modal']}>{children}</div>
    </div>,
    modalRoot
  );
};
Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
