import { Link } from "react-router-dom";

import { useContext, useState } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function Header() {
  const currentPageLabel = useContext(CurrentPageLabelContext);
  const [showMenuBar, setShowMenuBar] = useState(false);
  let playing = false;

  function test() {
    setShowMenuBar(!showMenuBar);
    // if (!playing) {
    //   var audio = new Audio("../../test/onthegang.mp3");
    //   playing = true;
    //   audio.play();
    // }
  }

  return (
    <>
      <div className="header">
        <div className="things-at-the-very-top">
          <input
            onClick={test}
            className="menu-icon"
            type="image"
            src="../../images/icon_small.png"
          />
          <h1 className="website-title">Articles and News</h1>
          <button className="sign-in-button">Sign In/Create An Account</button>
        </div>
        {showMenuBar ? (
          <div className="sideBarLayout">
            <nav className="sideBar">
              <div className="sideBarLink">
                <Link to="/">Home</Link>
              </div>
              <div className="sideBarLink">
                <Link to="/topics">Topics</Link>
              </div>
            </nav>
          </div>
        ) : (
          <div className="sideBarLayout"></div>
        )}
      </div>
    </>
  );
}

export default Header;
