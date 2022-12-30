import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#backdrop');

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, []);

  return createPortal(
    <div
      tabIndex="-1"
      className={css['backdrop']}
      onClick={closeModal}
      onKeyDown={closeModal}
    >
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
