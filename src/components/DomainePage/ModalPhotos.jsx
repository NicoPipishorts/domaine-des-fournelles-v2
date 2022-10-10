// -- IMPORT NPM
import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group";

// --  IMPORT COMPONENTS

// -- IMPORT ASSETS
import './styles.scss';

const ModalPhotos = ( { photo, onClose, show }) => {

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition
      in={show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
    
      <section className='modal-photos__container' onClick={onClose}>
        <div className="modal-photos__content" onClick={e => e.stopPropagation()}>
          <img src={photo} alt="Domaine des Fournelles" className="modal-photos__photo" />
          <button className="modal-photos__close" onClick={onClose}>
            X
          </button>
        </div>
      </section>

    </CSSTransition>

  )

}

export default ModalPhotos;