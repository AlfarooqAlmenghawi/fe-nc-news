import { Link } from "react-router-dom";

import { useContext } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";

function Header() {
  const currentPageLabel = useContext(CurrentPageLabelContext);
  let playing = false;

  function test() {
    // if (!playing) {
    //   var audio = new Audio("../../test/onthegang.mp3");
    //   playing = true;
    //   audio.play();
    // }
  }

  return (
    <>
      <div className="header">
        <input
          onClick={test}
          className="menu-icon"
          type="image"
          src="../../images/icon_small.png"
        />
        <nav className="sideBar">
          <div className="sideBarLink">
            <Link to="/">Home</Link>
          </div>
          <div className="sideBarLink">
            <Link to="/topics">Topics</Link>
          </div>
        </nav>
        <h1 className="website-title">Articles and News</h1>
        <button className="sign-in-button">Sign In/Create An Account</button>
      </div>
    </>
  );
}

export default Header;
