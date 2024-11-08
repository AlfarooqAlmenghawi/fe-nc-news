import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getArticlesByTopic } from "../../api.js";

function ArticlesByTopic() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [articlesByTopic, setArticlesByTopic] = useState([]);
  const navigate = useNavigate();

  const { topic } = useParams();

  function handleClick(event) {
    const articleName = event.currentTarget.dataset.articlename;
    const articleID = event.currentTarget.dataset.articleid;
    console.log(`The ${articleName} article clicked`);
    navigate(`/articles/${articleID}`);
  }

  useEffect(() => {
    getArticlesByTopic(topic).then((response) => {
      console.log(response);
      setArticlesByTopic(response.data.articlesWithTotalComments);
    });
  }, []);

  setCurrentPageLabel("Topics related to " + topic);

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      <div className="all-the-articles">
        {articlesByTopic.map((article) => {
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

export default ArticlesByTopic;
