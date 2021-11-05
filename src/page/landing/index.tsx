import React, { useState } from "react";
import Modal from "../../components/Modal";
import LandingPageForm from "./landing__form";
import Button from "../../components/Button";

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
        <h1 className="landing__heading">A better way</h1>
        <h1 className="landing__heading">to enjoy every day.</h1>
        <p className="landing__subheading">Be the first to know when we launch.</p>
        <Button onClick={openModal}><span>Request an invite</span></Button>
      </div>
      <Modal show={showModal} onClose={closeModal}>
        <LandingPageForm />
      </Modal>
    </>
  );
}

export default LandingPage;