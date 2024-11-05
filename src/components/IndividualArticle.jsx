import { useEffect, useState } from "react";
import { getArticleByID, getCommentsOfSpecificArticle } from "../../api.js";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

// {/* <p>Individual Article here, article is {article.title}</p>; */}

function IndividualArticle() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [article, setArticle] = useState([]);
  const [commentsOfIndividualArticle, setCommentsOfIndividualArticle] =
    useState([]);
  const { article_id } = useParams();

  setCurrentPageLabel(article.title);

  useEffect(() => {
    getArticleByID(article_id).then((response) => {
      //
      console.log(response.data.article);
      setArticle(response.data.article[0]);
    });
    getCommentsOfSpecificArticle(article_id).then((response) => {
      console.log(response.data.commentsOfThisArticle);
      setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
    });
  }, []);

  return (
    <>
      {currentPageLabel ? (
        <h2 className="current-page-label">{currentPageLabel}</h2>
      ) : (
        <h2 className="current-page-label">Loading...</h2>
      )}
      <div className="full-individual-article">
        <div className="full-individual-article-itself">
          <div className="full-individual-article-things-to-center">
            <img
              className="full-individual-article-image"
              src={article.article_img_url}
            />
            <p className="full-individual-article-topic">
              Topic: {article.topic}
            </p>
          </div>
          <p className="full-individual-article-text">{article.body}</p>

          <div className="full-individual-article-metadata">
            <p>
              This article was made by {article.author} at {article.created_at}.
              It has {article.votes} upvotes and {article.comment_count}{" "}
              comments.
            </p>
          </div>
        </div>
        <div className="full-individual-article-comments">
          <div className="entire-comments-of-full-individual-article">
            <p>Comments:</p>
            {commentsOfIndividualArticle.map((comment) => {
              return (
                <div className="individual-comment">
                  <p>Comment: {comment.body}</p>
                  <p>
                    By: {comment.author} at {comment.created_at}
                  </p>
                  <p>Upvotes: {comment.votes}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualArticle;
