import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";

import MindMap from "./Pages/Fourth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fourth" element={<MindMap />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
