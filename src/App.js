import React from "react";
import { Route, Switch } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <main className="container">
      <NavBar />
      <Movies />
    </main>
  );
}

export default App;
