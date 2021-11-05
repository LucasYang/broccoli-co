import React from "react";
import LandingPage from "./page/landing";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app__header">BROCCOLI & CO.</header>
      <main className="app__body">
        <LandingPage />
      </main>
      <footer className="app__footer">
        <p className="app__footer__p">Made with ♥ in Melbourne.</p>
        <p className="app__footer__p">© {new Date().getFullYear()} Broccoli & Co. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
