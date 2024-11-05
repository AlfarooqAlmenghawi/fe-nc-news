import { useEffect, useState } from "react";
import { getArticleByID } from "../../api.js";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

// {/* <p>Individual Article here, article is {article.title}</p>; */}

function IndividualArticle() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [article, setArticle] = useState([]);
  const { article_id } = useParams();

  setCurrentPageLabel(article.title);

  useEffect(() => {
    getArticleByID(article_id).then((response) => {
      //
      console.log(response.data.article);
      setArticle(response.data.article[0]);
    });
  }, []);

  return (
    <>
      <div className="full-individual-article">
        <div className="full-individual-article-itself">
          <div className="full-individual-article-things-to-center">
            {currentPageLabel ? (
              <h2 className="current-page-label">{currentPageLabel}</h2>
            ) : (
              <h2 className="current-page-label">Loading...</h2>
            )}
            <p className="full-individual-article-topic">
              Topic: {article.topic}
            </p>
            <img
              className="full-individual-article-image"
              src={article.article_img_url}
            />
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
            <p>For comments</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndividualArticle;
