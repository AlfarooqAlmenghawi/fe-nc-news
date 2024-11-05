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

export { getArticles, getArticleByID, getCommentsOfSpecificArticle };
