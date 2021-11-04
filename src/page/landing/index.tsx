import React from "react";
import Modal from "../../components/Modal";
import LandingPageForm from "./landing__form";

export function LandingPage() {
  return (
    <>
      <div>
        <h1>A better way to enjoy every day.</h1>
        <p>Be the first to know when we launch.</p>
        <button>Request an invite</button>
      </div>
      <Modal show onClose={() => { }}>
        <LandingPageForm />
      </Modal>
    </>
  );
}

export default LandingPage;