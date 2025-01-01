import { useEffect, useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function Home() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );
  useEffect(() => {
    setCurrentPageLabel("Home");
  });

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
    </>
  );
}

export default Home;
