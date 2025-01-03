import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
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
    const [key, value] = document.cookie.split("=");
    console.log(document.cookie);
    if (key === "user" && value) {
      console.log("Already signed in. Refresh");
    } else {
      navigate(`/authentication`);
    }
  }

  function signOut() {
    console.log("Signing out..");
    const [key, value] = document.cookie.split("=");
    const cookieObject = JSON.parse(decodeURIComponent(value));
    console.log(cookieObject);
    if (cookieObject.username) {
      document.cookie = "user=; max-age=0; path=/";
      setCurrentUser(null);
      navigate(`/`);
    }
  }

  function test() {
    console.log(document.cookie);
    setShowMenuBar(!showMenuBar);
  }

  useEffect(() => {
    const [key, value] = document.cookie.split("=");
    if (value) {
      const cookieObject = JSON.parse(decodeURIComponent(value));
      setCurrentUser(cookieObject);
    } else {
      setCurrentUser(null);
    }
  }, []);

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
              <div onClick={signOut}>
                <p className="user-title">{currentUser.username}</p>
                <p className="user-full-name">({currentUser.name})</p>
              </div>
            </div>
          ) : isAuthenticationRoute ? null : (
            // <button
            //   disabled
            //   className="sign-in-button-dissapear"
            //   onClick={navigateToSignIn}
            // >
            //   {" "}
            //   Sign In
            // </button>
            <button
              onClick={navigateToSignIn}
              className="sign-in-button"
              enabled="true"
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
