import { useState, useContext, useEffect } from "react";
import { getTopics } from "../../api.js";
import { useNavigate } from "react-router-dom";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function Topics() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  function handleClick(event) {
    const topicName = event.currentTarget.dataset.topic;
    // console.log(`The ${topicName} topic clicked`);
    navigate(`/topics/${topicName}`);
  }

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response.data.topics);
    });
  }, []);

  setCurrentPageLabel("Topics");

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      <div className="all-the-topics">
        {topics.map((topic) => {
          return (
            <div
              data-topic={topic.slug}
              className="topic"
              onClick={handleClick}
            >
              <h1 className="topic-title">{topic.slug}</h1>
              <p className="topic-description">{topic.description}</p>
              <p className="topic-click-info">
                Click to see all {topic.slug} articles
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Topics;
