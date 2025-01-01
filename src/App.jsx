import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CurrentPageLabelProvider } from "./contexts/CurrentPageLabel";
import { CurrentUserProvider } from "./contexts/User";
import Header from "./components/Header";
import Home from "./components/Home";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import Authentication from "./components/Authentication";
import IndividualArticle from "./components/IndividualArticle";
import ArticlesByTopic from "./components/ArticlesByTopic";
import InvalidEndPoint from "./components/InvalidEndPoint";

function App() {
  return (
    <>
      <BrowserRouter>
        <CurrentPageLabelProvider>
          <CurrentUserProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/topics" element={<Topics />} />
              <Route
                path="/articles/:article_id"
                element={<IndividualArticle />}
              />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/topics/:topic" element={<ArticlesByTopic />} />
              <Route path="*" element={<InvalidEndPoint />} />
            </Routes>
          </CurrentUserProvider>
        </CurrentPageLabelProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
