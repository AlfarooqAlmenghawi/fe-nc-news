import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { CurrentUserContext } from "../contexts/User.jsx";
import menuIcon from "../../images/icon_small.png";

function Header() {
  const currentPageLabel = useContext(CurrentPageLabelContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [showMenuBar, setShowMenuBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  let playing = false;

  const isAuthenticationRoute = location.pathname.includes("/authentication");

  function navigateToSignIn() {
    navigate(`/authentication`);
  }

  function test() {
    setShowMenuBar(!showMenuBar);
  }

  return (
    <>
      <div className="header">
        <div className="things-at-the-very-top">
          <input
            onClick={test}
            className="menu-icon"
            type="image"
            src={menuIcon}
            alt="Menu Icon"
          />
          <h1 className="website-title">Articles and News</h1>
          {currentUser ? (
            <div className="signed-in">
              <div className="user-image">
                <img className="user-image" src={currentUser.avatar_url} />
              </div>
              <div>
                <p className="user-title">{currentUser.username}</p>
                <p className="user-full-name">({currentUser.name})</p>
              </div>
            </div>
          ) : isAuthenticationRoute ? //   onClick={navigateToSignIn} // <button
          //   className="sign-in-button-dissapear"
          //   disabled
          // >
          //   Sign In
          // </button>
          null : (
            <button
              onClick={navigateToSignIn}
              className="sign-in-button"
              enabled
            >
              Sign In
            </button>
          )}
        </div>
        {showMenuBar ? (
          <div className="sideBarLayout">
            <nav className="sideBar">
              <div className="sideBarLink">
                <Link className="link" to="/">
                  Home
                </Link>
              </div>
              <div className="sideBarLink">
                <Link className="link" to="/articles">
                  Articles
                </Link>
              </div>
              <div className="sideBarLink">
                <Link className="link" to="/topics">
                  Topics
                </Link>
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
