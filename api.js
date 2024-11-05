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

function getArticleByID(ID) {
  const apiClient = axios.create({
    baseURL: "https://nc-news-uocp.onrender.com/api/",
    timeout: 10000,
  });

  return apiClient.get(`/articles/${ID}`).then((response) => {
    return response;
  });
}

export { getArticles, getArticleByID };
