import React from "react";
import modalStyles from './index.module.css';

interface ModalInterface {
  show: boolean;
  children: React.ReactElement;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Modal({ show, children }: ModalInterface) {
  const showHideClassName = show ? `${modalStyles.container} ${modalStyles.displayBlock}` : `${modalStyles.container} ${modalStyles.displayNone}`;
  return (
    show ? (
      <div className={showHideClassName}>
        <section className={modalStyles.main}>
          {children}
        </section>
      </div>
    ) : null
  );
}

export default Modal;
