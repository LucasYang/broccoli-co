import React, { useState } from "react";
import Modal from "../../components/Modal";
import LandingPageForm from "./landing__form";
import AllDone from "./landing__allDone";
import Button from "../../components/Button";
import { INVITE_BUTTON_TEST_ID } from '../../tests/_setup';

export function LandingPage({ postLandingForm }: any) {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);

  const openFormModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFormModal(true);
  }

  const closeFormModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFormModal(false);
  }

  const closeDoneModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowDoneModal(false);
  }

  const onLandingFormSuccess = () => {
    setShowFormModal(false);
    setShowDoneModal(true);
  }

  return (
    <>
      <div>
        <h1 className="landing__heading">A better way</h1>
        <h1 className="landing__heading">to enjoy every day.</h1>
        <p className="landing__subheading">Be the first to know when we launch.</p>
        <Button onClick={openFormModal} data-testid={INVITE_BUTTON_TEST_ID}>
          <span>Request an invite</span>
        </Button>
      </div>
      <Modal show={showFormModal} onClose={closeFormModal}>
        <LandingPageForm onSuccess={onLandingFormSuccess} postLandingForm={postLandingForm} />
      </Modal>
      <Modal show={showDoneModal} onClose={closeDoneModal}>
        <AllDone onConfirm={closeDoneModal} />
      </Modal>
    </>
  );
}

export default LandingPage;