import { useContext, useEffect } from "react";
import { useState } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { CurrentUserContext } from "../contexts/User.jsx";
import { getArticles, deleteSpecificArticle } from "../../api.js";
import { useNavigate } from "react-router-dom";

function Articles() {
  const [queries, setQueries] = useState({});
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  function handleClick(event) {
    const articleName = event.currentTarget.dataset.articlename;
    const articleID = event.currentTarget.dataset.articleid;

    navigate(`/articles/${articleID}`);
  }

  function handleStatsSortingChange(event) {
    const sortByQuery = event.target.value;

    switch (sortByQuery) {
      case "None":
        delete queries.sort_by;
        break;
      case "Date":
        queries.sort_by = "created_at";
        break;
      case "Comment Count":
        queries.sort_by = "comment_count";
        break;
      case "Votes":
        queries.sort_by = "votes";
        break;
    }

    getArticles(queries).then((response) => {
      setArticles(response.data.articlesWithTotalComments);
    });
  }

  function handleOrderSortingChange(event) {
    const orderQuery = event.target.value;

    switch (orderQuery) {
      case "None":
        delete queries.order;
        break;
      case "Ascending":
        queries.order = "asc";
        break;
      case "Descending":
        queries.order = "desc";
        break;
    }

    getArticles(queries).then((response) => {
      setArticles(response.data.articlesWithTotalComments);
    });
  }

  function deleteTheArticle(event) {
    const articleID = event.currentTarget.dataset.articleid;
    deleteSpecificArticle(articleID).then(() => {
      getArticles(queries).then((response) => {
        setArticles(response.data.articlesWithTotalComments);
      });
    });
  }

  useEffect(() => {
    setCurrentPageLabel("Articles");
    getArticles(queries).then((response) => {
      setArticles(response.data.articlesWithTotalComments);
    });
  }, []);

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      {articles.length ? (
        <>
          <div className="filter">
            <div className="filter-contents-to-center">
              <p className="filter-label">Sort By: </p>
              <select
                className="filter-dropdown"
                onChange={handleStatsSortingChange}
              >
                <option>Date</option>
                <option>Comment Count</option>
                <option>Votes</option>
              </select>
              <p className="filter-label">Order: </p>
              <select
                className="filter-dropdown"
                onChange={handleOrderSortingChange}
              >
                <option>Descending</option>
                <option>Ascending</option>
              </select>
            </div>
          </div>
        </>
      ) : null}
      <div className="all-the-articles" key={1}>
        {articles.map((article) => {
          const articleDate = new Date(article.created_at);
          const formatArticleDate = articleDate.toLocaleString();
          return (
            <>
              <div key={article.article_id}>
                {currentUser?.username === "Alfarooq" ||
                currentUser?.username === article.author ? (
                  <button
                    data-articleid={article.article_id}
                    onClick={deleteTheArticle}
                  >
                    x
                  </button>
                ) : null}
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
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-text">Author: {article.author}</p>
                    <p className="article-text">Created: {formatArticleDate}</p>
                    <p className="article-text">Topic: {article.topic}</p>
                    <p className="article-text">Upvotes: {article.votes}</p>
                    <p className="article-text">
                      Comments: {article.comment_count}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Articles;
