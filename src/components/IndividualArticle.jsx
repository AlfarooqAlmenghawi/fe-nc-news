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
// SUPABASE START
import supabase from "../../supabaseClient.js";
// SUPABASE END

function IndividualArticle() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [article, setArticle] = useState([]);
  const [commentsOfIndividualArticle, setCommentsOfIndividualArticle] =
    useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [isDeleting, setIsDeleting] = useState({
    status: false,
    comment_id: null,
  });
  const [votes, setVotes] = useState(0);
  const [errorOnScreen, setErrorOnScreen] = useState("");
  const [commentErrorOnScreen, setCommentErrorOnScreen] = useState("");
  const [textBox, setTextBox] = useState("");
  const { article_id } = useParams();

  const [loadingCommentsStatus, setLoadingCommentsStatus] = useState(true);

  const [currentInput, setCurrentInput] = useState("");

  function handleUpvote() {
    setVotes((currentVotes) => currentVotes + 1);
    upvoteSpecificArticle(article_id)
      .then(() => {
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
      setCommentErrorOnScreen("Comment cannot be empty");
      setIsPosting(false);
    } else {
      postCommentToSpecificArticle(
        article_id,
        currentInput,
        currentUser.username
      )
        .then((response) => {
          getCommentsOfSpecificArticle(article_id).then((response) => {
            setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
          });
          setCommentErrorOnScreen("");
          setTextBox("");
          setIsPosting(false);
        })
        .catch((error) => {
          setCommentErrorOnScreen("Error");
          setIsPosting(false);
        });
    }
  }

  function deleteComment(event) {
    const commentID = event.currentTarget.dataset.commentid;

    setIsDeleting({
      status: true,
      comment_id: commentID,
    });

    deleteSpecificComment(commentID)
      .then(() => {
        getCommentsOfSpecificArticle(article_id)
          .then((response) => {
            setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
            setIsDeleting({
              status: false,
              comment_id: null,
            });
          })
          .catch((error) => {
            setCommentsOfIndividualArticle([]);
          });
      })
      .catch((error) => {
        setIsDeleting({
          status: false,
          comment_id: null,
        });
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
        setArticle([]);
        setCurrentPageLabel("Article doesn't seem to exist");
      });
    setLoadingCommentsStatus(true);
    getCommentsOfSpecificArticle(article_id)
      .then((response) => {
        setCommentsOfIndividualArticle(response.data.commentsOfThisArticle);
        setLoadingCommentsStatus(false);
      })
      .catch((error) => {
        setCommentsOfIndividualArticle([]);
        setLoadingCommentsStatus(false);
      });

    // SUPABASE START

    console.log("Supabase client:", supabase);
    const commentsSubscription = supabase
      .channel("simple-comments-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
        },
        (payload) => {
          console.log("Simple change received!", payload);
          getCommentsOfSpecificArticle(article_id)
            .then((response) => {
              setCommentsOfIndividualArticle(
                response.data.commentsOfThisArticle
              );
            })
            .catch((error) => {
              setCommentsOfIndividualArticle([]);
            });
        }
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(commentsSubscription);
    };

    // SUPABASE END
  }, [article_id]);

  const articleDate = new Date(article.created_at);
  const formatArticleDate = articleDate.toLocaleString();

  return (
    <>
      {currentPageLabel ? (
        <h2 className="current-page-label">{currentPageLabel}</h2>
      ) : (
        <h2 className="current-page-label">Loading ARTICLE...</h2>
      )}
      {article.length !== 0 ? (
        <div className="full-individual-article">
          <div className="full-individual-article-itself">
            <div className="full-individual-article-things-to-center">
              <p className="full-individual-article-topic">
                Topic: {article.topic}
              </p>
              <img
                className="full-individual-article-image"
                src={article.article_img_url}
              />
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
                .
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
      {!loadingCommentsStatus ? (
        <>
          {currentUser ? (
            <form onSubmit={postComment} className="commenting-wrap">
              <textarea
                onChange={(event) => {
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
            <p className="comments-label">Please log in.</p>
          )}
          {commentsOfIndividualArticle.length ? (
            <div className="full-individual-article-comments">
              <div className="entire-comments-of-full-individual-article">
                <p className="comments-label">Comments:</p>
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
                        isDeleting.status &&
                        isDeleting.comment_id == comment.comment_id ? (
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
          ) : (
            <p>{commentErrorOnScreen}</p>
          )}
        </>
      ) : (
        <p className="current-page-label">Loading COMMENTS...</p>
      )}
    </>
  );
}

export default IndividualArticle;
