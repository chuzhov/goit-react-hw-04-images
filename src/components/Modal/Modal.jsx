import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#backdrop');

class Modal extends Component {
  handleCloseModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }

  render() {
    //  const { modalData } = this.props;

    return createPortal(
      <div className={css['backdrop']} onClick={this.handleCloseModal}>
        <div className={css['modal']}>
          {/* <h1 className={s.title}>
          <a href={modalData.url} target="_blank" rel="noreferrer">
            {modalData.title}
          </a>
        </h1> */}
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
