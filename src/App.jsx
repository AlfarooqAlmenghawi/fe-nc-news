import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CurrentPageLabelProvider } from "./contexts/CurrentPageLabel";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import IndividualArticle from "./components/IndividualArticle";

function App() {
  return (
    <>
      <BrowserRouter>
        <CurrentPageLabelProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route
              path="/articles/:article_id"
              element={<IndividualArticle />}
            />
          </Routes>
        </CurrentPageLabelProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
