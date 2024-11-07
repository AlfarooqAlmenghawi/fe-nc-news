import { useEffect, useState } from "react";
import {
  getArticleByID,
  getCommentsOfSpecificArticle,
  upvoteSpecificArticle,
  downvoteSpecificArticle,
  postCommentToSpecificArticle,
} from "../../api.js";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { CurrentUserContext } from "../contexts/User.jsx";

// {/* <p>Individual Article here, article is {article.title}</p>; */}

function IndividualArticle() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [article, setArticle] = useState([]);
  const [commentsOfIndividualArticle, setCommentsOfIndividualArticle] =
    useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [votes, setVotes] = useState(0);
  const [errorOnScreen, setErrorOnScreen] = useState("");
  const { article_id } = useParams();

  const [currentInput, setCurrentInput] = useState("");

  setCurrentPageLabel(article.title);

  function handleUpvote() {
    setVotes((currentVotes) => currentVotes + 1);
    upvoteSpecificArticle(article_id)
      .then(() => {
        console.log(
          `Successful, votes are now ${votes + 1}. Upvoted by ${currentUser}`
        );
        setErrorOnScreen("");
      })
      .catch((error) => {
        setErrorOnScreen("Error Upvoting, couldn't connect to server");
        setVotes((currentVotes) => currentVotes - 1);
      });
  }

  function handleDownvote() {
    setVotes((currentVotes) => currentVotes - 1);
    downvoteSpecificArticle(article_id)
      .then(() => {
        console.log(
          `Successful, votes are now ${votes - 1}. Downvoted by ${
            currentUser.username
          } (${currentUser.name})`
        );
        setErrorOnScreen("");
      })
      .catch((error) => {
        setErrorOnScreen("Error Downvoting, couldn't connect to server");
        setVotes((currentVotes) => currentVotes + 1);
      });
  }

  function postComment(event) {
    event.preventDefault();
    setIsPosting(true);
    if (currentInput === "") {
      console.log("Write something first please");
      setIsPosting(false);
    } else {
      console.log("Attempting to post comment", currentInput);
      postCommentToSpecificArticle(
        article_id,
        currentInput,
        currentUser.username
      )
        .then((response) => {
          getCommentsOfSpecificArticle(article_id).then((response) => {
            setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
          });
          console.log(response);
          setIsPosting(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    getArticleByID(article_id).then((response) => {
      setArticle(response.data.article[0]);
      setVotes(response.data.article[0].votes);
    });
    getCommentsOfSpecificArticle(article_id).then((response) => {
      setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
    });
  }, []);

  const articleDate = new Date(article.created_at);
  const formatArticleDate = articleDate.toLocaleString();

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

          <div className="voting">
            <button onClick={handleUpvote}>🔼</button>
            <p>{votes}</p>
            <button onClick={handleDownvote}>🔽</button>
            <p>{errorOnScreen}</p>
          </div>

          <div className="full-individual-article-metadata">
            <p>
              This article was made by {article.author} at {formatArticleDate}.
              It has {article.votes} upvotes and {article.comment_count}{" "}
              comments.
            </p>
          </div>
        </div>
        <div className="full-individual-article-comments">
          {currentUser ? (
            <form onSubmit={postComment} className="commenting-wrap">
              <textarea
                onChange={(event) => {
                  console.log(event.target.value);
                  setCurrentInput(event.target.value);
                }}
                className="commenting-input"
                placeholder={`Say something, ${currentUser.name}!`}
              ></textarea>
              {isPosting ? (
                <button
                  type="submit"
                  className="commenting-post-button"
                  disabled
                >
                  POSTING
                </button>
              ) : (
                <button type="submit" className="commenting-post-button">
                  POST COMMENT
                </button>
              )}
            </form>
          ) : (
            <p>Please Log In.</p>
          )}

          <div className="entire-comments-of-full-individual-article">
            <p class="comments-label">Comments:</p>
            {commentsOfIndividualArticle.map((comment) => {
              const commentDate = new Date(comment.created_at);
              const formatCommentDate = commentDate.toLocaleString();
              return (
                <div className="individual-comment">
                  {currentUser.username === comment.author ? (
                    <p>you own this comment</p>
                  ) : (
                    <p>nope</p>
                  )}
                  <p>Comment: {comment.body}</p>
                  <p>
                    By: {comment.author} at {formatCommentDate}
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
