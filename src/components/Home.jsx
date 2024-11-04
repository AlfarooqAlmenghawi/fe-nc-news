import { useContext, useEffect } from "react";
import { useState } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { getArticles } from "../../api.js";

function Home() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [articles, setArticles] = useState([]);

  function handleClick(event) {
    const articleName = event.currentTarget.dataset.articlename;
    console.log(`The ${articleName} article clicked`);
  }

  useEffect(() => {
    getArticles().then((response) => {
      console.log(response.data.articlesWithTotalComments);
      setArticles(response.data.articlesWithTotalComments);
    });
  }, []);

  setCurrentPageLabel("Articles");

  return (
    <>
      <h2>{currentPageLabel}</h2>
      <div className="all-the-articles">
        {articles.map((article) => {
          return (
            <>
              <div
                data-articlename={article.title}
                className="individual-article"
                onClick={handleClick}
              >
                <img
                  className="individual-article-image"
                  src={article.article_img_url}
                ></img>
                <h3>{article.title}</h3>
                <p class="article-text">Author: {article.author}</p>
                <p class="article-text">Created: {article.created_at}</p>
                <p class="article-text">Topic: {article.topic}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
