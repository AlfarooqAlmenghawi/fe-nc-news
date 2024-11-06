import { useContext, useEffect } from "react";
import { useState } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { getArticles } from "../../api.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  function handleClick(event) {
    const articleName = event.currentTarget.dataset.articlename;
    const articleID = event.currentTarget.dataset.articleid;
    console.log(`The ${articleName} article clicked`);
    navigate(`/articles/${articleID}`);
  }

  useEffect(() => {
    getArticles().then((response) => {
      setArticles(response.data.articlesWithTotalComments);
    });
  }, []);

  setCurrentPageLabel("Articles");

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      <div className="all-the-articles">
        {articles.map((article) => {
          const articleDate = new Date(article.created_at);
          const formatArticleDate = articleDate.toLocaleString();
          return (
            <>
              <div
                data-articlename={article.title}
                data-articleid={article.article_id}
                className="individual-article"
                onClick={handleClick}
              >
                <img
                  className="individual-article-image"
                  src={article.article_img_url}
                ></img>
                <div className="article-info">
                  <h3 class="article-title">{article.title}</h3>
                  <p class="article-text">Author: {article.author}</p>
                  <p class="article-text">Created: {formatArticleDate}</p>
                  <p class="article-text">Topic: {article.topic}</p>
                  <p class="article-text">Upvotes: {article.votes}</p>
                  <p class="article-text">Comments: {article.comment_count}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Home;
