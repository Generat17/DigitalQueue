import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Presentation from "./pages/Presentation";
import QualityControl from "./pages/QualityControl";
import Reception from "./pages/Reception";
import Scoreboard from "./pages/Scoreboard";
import StartPage from "./pages/StartPage";
import "./App.scss";
import "@styles/variables.scss";
import Wait from "./pages/Wait";
import Workstation from "./pages/Workstation";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/presention" element={<Presentation />} />
          <Route path="/quality/:workstationID" element={<QualityControl />} />
          <Route path="/reception" element={<Reception />} />
          <Route path="/wait/:service" element={<Wait />} />
          <Route path="/scoreboard" element={<Scoreboard />} />
          <Route path="/workstation/:workstationID" element={<Workstation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
