import axios from "axios";

function getArticles() {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get("/articles").then((response) => {
    return response;
  });
}

function getArticlesByTopic(TOPIC) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get(`/articles?topic=${TOPIC}`).then((response) => {
    return response;
  });
}

function getUsers() {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get("/users").then((response) => {
    return response;
  });
}

function getTopics() {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get("/topics").then((response) => {
    return response;
  });
}

function getArticleByID(ARTICLE_ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get(`/articles/${ARTICLE_ID}`).then((response) => {
    return response;
  });
}

function getCommentsOfSpecificArticle(ARTICLE_ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get(`/articles/${ARTICLE_ID}/comments`).then((response) => {
    return response;
  });
}

function upvoteSpecificArticle(ARTICLE_ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 3000,
  });

  return apiClient
    .patch(`/articles/${ARTICLE_ID}`, {
      inc_votes: 1,
    })
    .then((response) => {});
}

function downvoteSpecificArticle(ARTICLE_ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 3000,
  });

  return apiClient
    .patch(`/articles/${ARTICLE_ID}`, {
      inc_votes: -1,
    })
    .then((response) => {});
}

function postCommentToSpecificArticle(ARTICLE_ID, COMMENT, USER) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 3000,
  });

  return apiClient
    .post(`/articles/${ARTICLE_ID}/comments`, {
      username: USER,
      comment: COMMENT,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(USER);
    });
}

function deleteSpecificComment(COMMENT_ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 3000,
  });

  return apiClient
    .delete(`/comments/${COMMENT_ID}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export {
  getArticles,
  getArticlesByTopic,
  getUsers,
  getTopics,
  getArticleByID,
  getCommentsOfSpecificArticle,
  upvoteSpecificArticle,
  downvoteSpecificArticle,
  postCommentToSpecificArticle,
  deleteSpecificComment,
};
