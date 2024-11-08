import { useState, useContext, useEffect } from "react";
import { getTopics } from "../../api.js";

import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function InvalidEndPoint() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response.data.topics);
    });
  }, []);

  setCurrentPageLabel(
    `⚠️ Oh no! The server is scratching it's head ⚠️ (Invalid Endpoint)`
  );

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      <div className="error"></div>
    </>
  );
}

export default InvalidEndPoint;
