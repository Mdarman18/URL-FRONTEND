import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./component/App";
import New from "./component/New";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="//api/detalis/:shortId" element={<New />} />
      </Routes>
    </div>
  );
};

export default App;
