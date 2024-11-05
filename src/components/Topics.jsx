import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function Topics() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );

  setCurrentPageLabel("Topics");

  return <h2>{currentPageLabel}</h2>;
}

export default Topics;
