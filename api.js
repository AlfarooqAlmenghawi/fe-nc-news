import axios from "axios";

function getArticles(QUERIES) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  let endpoint = "";

  if (QUERIES.sort_by && QUERIES.order) {
    endpoint = `/articles?sort_by=${QUERIES.sort_by}&order=${QUERIES.order}`;
  } else if (QUERIES.sort_by && !QUERIES.order) {
    endpoint = `/articles?sort_by=${QUERIES.sort_by}`;
  } else if (QUERIES.order && !QUERIES.sort_by) {
    endpoint = `/articles?order=${QUERIES.order}`;
  } else {
    endpoint = "/articles";
  }

  console.warn("The endpoint is", endpoint);

  return apiClient.get(endpoint).then((response) => {
    return response;
  });
}

function getArticlesByTopic(TOPIC, QUERIES) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  let endpoint = "";

  if (QUERIES.sort_by && QUERIES.order) {
    endpoint = `/articles?topic=${TOPIC}&sort_by=${QUERIES.sort_by}&order=${QUERIES.order}`;
  } else if (QUERIES.sort_by && !QUERIES.order) {
    endpoint = `/articles?topic=${TOPIC}&sort_by=${QUERIES.sort_by}`;
  } else if (QUERIES.order && !QUERIES.sort_by) {
    endpoint = `/articles?topic=${TOPIC}&order=${QUERIES.order}`;
  } else {
    endpoint = `/articles?topic=${TOPIC}`;
  }

  console.warn("The endpoint is", endpoint);

  return apiClient.get(endpoint).then((response) => {
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

  return apiClient
    .get(`/articles/${ARTICLE_ID}/comments`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
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
    .catch((error) => {});
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
    .catch((error) => {});
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
