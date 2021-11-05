import React, { useState } from "react";
import Modal from "../../components/Modal";
import LandingPageForm from "./landing__form";

export function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowModal(true);
  }

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowModal(false);
  }

  return (
    <>
      <div>
        <h1>A better way to enjoy every day.</h1>
        <p>Be the first to know when we launch.</p>
        <button onClick={openModal}>Request an invite</button>
      </div>
      <Modal show={showModal} onClose={closeModal}>
        <LandingPageForm />
      </Modal>
    </>
  );
}

export default LandingPage;