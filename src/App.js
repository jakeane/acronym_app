import React from "react";
import "./App.css";
import MainPage from "./MainPage";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div>
      <Helmet>
        <style>{"body { background-color: #1E3585; }"}</style>
      </Helmet>
      <MainPage />
    </div>
  );
}

export default App;
