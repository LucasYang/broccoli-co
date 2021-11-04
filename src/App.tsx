import React from "react";
import Modal from "./components/Modal";
import Form from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">BROCCOLI & CO.</header>
      <main className="app__body">
        <h1>A better way to enjoy every day.</h1>
        <p>Be the first to know when we launch.</p>
        <button>Request an invite</button>
      </main>
      <footer className="app__footer">
        <p>made with [love] in Melbourne.</p>
        <p>copy 2016 Broccoli & Co. All rights reserved.</p>
      </footer>
      <Modal show onClose={() => { }}>
        <Form name="landingPageForm">
          {({ error, register }: any) => {
            return (
              <div>
                <fieldset className="form-fieldset">
                  <label htmlFor="fullName">
                    Full name
                    <input name="fullName" type="text" defaultValue="" ref={(ref) => register(ref, 'fullName')} />
                    {error["fullName"] ? "error" : null}
                  </label>
                </fieldset>
                <fieldset className="form-fieldset">
                  <label htmlFor="email">
                    Email
                    <input name="email" type="email" defaultValue="" ref={(ref) => register(ref, 'email')} />
                  </label>
                </fieldset>
                <fieldset className="form-fieldset">
                  <label htmlFor="confirmEmail">
                    Confirm email
                    <input name="confirmEmail" type="email" defaultValue="" ref={(ref) => register(ref, 'confirmEmail')} />
                  </label>
                </fieldset>
                <fieldset>
                  <button type="submit">Send</button>
                </fieldset>
              </div>
            )
          }}
        </Form>
      </Modal>
    </div>
  );
}

export default App;
