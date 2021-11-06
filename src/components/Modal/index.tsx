import React, { useEffect } from "react";
import modalStyles from './index.module.css';

interface ModalInterface {
  show: boolean;
  children: React.ReactElement;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

export function Modal({ show, children }: ModalInterface) {
  const showHideClassName = show ? `${modalStyles.container} ${modalStyles.displayBlock}` : `${modalStyles.container} ${modalStyles.displayNone}`;
  useEffect(() => {
    if (show) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // When the modal is hidden, we want to remain at the top of the scroll position
      document.body.style.position = '';
      document.body.style.top = '';
    }
  }, [show]);
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
