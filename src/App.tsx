import React from "react";
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
    </div>
  );
}

export default App;
