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
        <p>made with [love] in Melbourne.</p>
        <p>copy 2016 Broccoli & Co. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
