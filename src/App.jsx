import { useState } from "react";
import Header from "./components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Topics from "./components/Topics";
import { CurrentPageLabelProvider } from "./contexts/CurrentPageLabel";

function App() {
  return (
    <>
      <BrowserRouter>
        <CurrentPageLabelProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
          </Routes>
        </CurrentPageLabelProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
