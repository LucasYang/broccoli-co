import React from "react";
import modalStyles from './index.module.css';

interface ModalInterface {
  show: boolean;
  children: React.ReactElement;
  onClose: () => void;
}

export function Modal({ show, children, onClose }: ModalInterface) {
  const showHideClassName = show ? `${modalStyles.container} ${modalStyles.displayBlock}` : `${modalStyles.container} ${modalStyles.displayNone}`;
  return (
    <div className={showHideClassName}>
      <section className={modalStyles.main}>
        {children}
        <button type="button" onClick={onClose}>Close</button>
      </section>
    </div>
  );
}

export default Modal;
