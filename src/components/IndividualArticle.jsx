import { useEffect, useState } from "react";
import {
  getArticleByID,
  getCommentsOfSpecificArticle,
  upvoteSpecificArticle,
  downvoteSpecificArticle,
  postCommentToSpecificArticle,
  deleteSpecificComment,
} from "../../api.js";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { CurrentUserContext } from "../contexts/User.jsx";
import supabase from "../../supabaseClient.js";

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [votes, setVotes] = useState(0);
  const [errorOnScreen, setErrorOnScreen] = useState("");
  const [commentErrorOnScreen, setCommentErrorOnScreen] = useState("");
  const [textBox, setTextBox] = useState("");
  const { article_id } = useParams();

  const [currentInput, setCurrentInput] = useState("");

  // setCurrentPageLabel(article.title);

  function handleUpvote() {
    setVotes((currentVotes) => currentVotes + 1);
    upvoteSpecificArticle(article_id)
      .then(() => {
        // console.log(
        //   `Successful, votes are now ${votes + 1}. Upvoted by ${
        //     currentUser.username
        //   } (${currentUser.name})`
        // );
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
        // // console.log(
        //   `Successful, votes are now ${votes - 1}. Downvoted by ${
        //     currentUser.username
        //   } (${currentUser.name})`
        // );
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
      // console.log("Write something first please");
      setCommentErrorOnScreen("Comment cannot be empty");
      setIsPosting(false);
    } else {
      // console.log("Attempting to post comment", currentInput);
      postCommentToSpecificArticle(
        article_id,
        currentInput,
        currentUser.username
      )
        .then((response) => {
          getCommentsOfSpecificArticle(article_id).then((response) => {
            setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
          });
          // console.log(response);
          setCommentErrorOnScreen("");
          setTextBox("");
          setIsPosting(false);
        })
        .catch((error) => {
          // console.log(error);
          setCommentErrorOnScreen("Error");
          setIsPosting(false);
        });
    }
  }

  function deleteComment(event) {
    const commentID = event.currentTarget.dataset.commentid;
    // console.log("attempting to delete comment", commentID);
    setIsDeleting(true);
    deleteSpecificComment(commentID)
      .then(() => {
        getCommentsOfSpecificArticle(article_id).then((response) => {
          setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
          // console.log("Deleted comment number", commentID, "successfully");
          setIsDeleting(false);
        });
      })
      .catch((error) => {
        // console.log(error);
        setIsDeleting(false);
      });
  }

  useEffect(() => {
    getArticleByID(article_id)
      .then((response) => {
        setArticle(response.data.article[0]);
        setVotes(response.data.article[0].votes);
        setCurrentPageLabel(response.data.article[0].title);
      })
      .catch((error) => {
        // console.log(error.status);
        setArticle([]);
        setCurrentPageLabel("Article doesn't seem to exist");
      });
    getCommentsOfSpecificArticle(article_id)
      .then((response) => {
        setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
      })
      .catch((error) => {
        // console.log(error);
        setCommentsOfIndividualArticle([]);
      });

    const commentsSubscription = supabase
      .from(`comments:article_id=eq.${article_id}`)
      .on("*", (payload) => {
        console.log("Change received!", payload);
        // Refresh comments after any insert, update, or delete event
        getCommentsOfSpecificArticle(article_id).then((response) => {
          setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
        });
      })
      .subscribe();

    // Clean up the subscription when the component unmounts
    return () => {
      supabase.removeSubscription(commentsSubscription);
    };
  }, [article_id]);

  const articleDate = new Date(article.created_at);
  const formatArticleDate = articleDate.toLocaleString();

  return (
    <>
      {currentPageLabel ? (
        <h2 className="current-page-label">{currentPageLabel}</h2>
      ) : (
        <h2 className="current-page-label">Loading...</h2>
      )}
      {article.length !== 0 ? (
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
                This article was made by {article.author} at {formatArticleDate}
                . It has {article.votes} upvotes and {article.comment_count}{" "}
                comments.
              </p>
            </div>
          </div>
          <div className="full-individual-article-comments">
            {currentUser ? (
              <form onSubmit={postComment} className="commenting-wrap">
                <textarea
                  onChange={(event) => {
                    // console.log(event.target.value);
                    setCurrentInput(event.target.value);
                  }}
                  className="commenting-input"
                  placeholder={`Say something, ${currentUser.name}!`}
                >
                  {textBox}
                </textarea>
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
            <p>{commentErrorOnScreen}</p>
            <div className="entire-comments-of-full-individual-article">
              <p class="comments-label">Comments:</p>
              {commentsOfIndividualArticle.map((comment) => {
                const commentDate = new Date(comment.created_at);
                const formatCommentDate = commentDate.toLocaleString();
                return (
                  <div className="individual-comment">
                    <p>Comment: {comment.body}</p>
                    <p>
                      By: {comment.author} at {formatCommentDate}
                    </p>
                    <p>Upvotes: {comment.votes}</p>
                    {currentUser &&
                    (currentUser.username === comment.author ||
                      currentUser.username === "Alfarooq") ? (
                      isDeleting ? (
                        <button
                          data-commentid={comment.comment_id}
                          onClick={deleteComment}
                          class="commenting-delete-button"
                          disabled
                        >
                          Deleting
                        </button>
                      ) : (
                        <button
                          data-commentid={comment.comment_id}
                          onClick={deleteComment}
                          class="commenting-delete-button"
                        >
                          Delete
                        </button>
                      )
                    ) : (
                      <p></p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default IndividualArticle;
