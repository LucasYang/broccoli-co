import React from "react";

interface ModalInterface {
  show: boolean;
  children: React.ReactChildren;
  onClose: () => void;
}

export function Modal({ show, children, onClose }: ModalInterface) {
  return (
    <div>
      <section className="modal-main">{children}</section>
      <button type="button">Close</button>
    </div>
  );
}

export default Modal;
