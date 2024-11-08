import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CurrentPageLabelProvider } from "./contexts/CurrentPageLabel";
import { CurrentUserProvider } from "./contexts/User";
import Header from "./components/Header";
import Home from "./components/Home";
import Topics from "./components/Topics";
import Authentication from "./components/Authentication";
import IndividualArticle from "./components/IndividualArticle";
import ArticlesByTopic from "./components/ArticlesByTopic";

function App() {
  return (
    <>
      <BrowserRouter>
        <CurrentPageLabelProvider>
          <CurrentUserProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/topics" element={<Topics />} />
              <Route
                path="/articles/:article_id"
                element={<IndividualArticle />}
              />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/topics/:topic" element={<ArticlesByTopic />} />
            </Routes>
          </CurrentUserProvider>
        </CurrentPageLabelProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
