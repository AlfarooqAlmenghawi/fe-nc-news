import { useState, useContext, useEffect } from "react";
import { CurrentPageLabelContext } from "../contexts/CurrentPageLabel.jsx";
import { CurrentUserContext } from "../contexts/User.jsx";
import { getUsers } from "../../api.js";

function Authentication() {
  const { currentPageLabel, setCurrentPageLabel } = useContext(
    CurrentPageLabelContext
  );
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [users, setUsers] = useState([]);

  function handleUserClick(event) {
    setCurrentUser(event.currentTarget.dataset);
    const user = event.currentTarget.dataset;
    console.log(user);
    document.cookie = `username=${user.username}; name=${
      user.name
    }; avatar_url=${user.avatar_url}; max-age=${7 * 24 * 60 * 60}`;
  }

  useEffect(() => {
    const cookies = document.cookie.split("; "); // Split all cookies into key-value pairs
    console.log(cookies);
    const cookieObject = {};
    cookies.forEach((cookie) => {
      const [key, value] = cookie.split("=");
      cookieObject[key] = value;
    });
    console.log(cookieObject);
    getUsers().then((response) => {
      setUsers(response.data.Users);
    });
  }, []);

  setCurrentPageLabel("Authentication");

  return (
    <>
      <h2 className="current-page-label">{currentPageLabel}</h2>
      <h3 className="current-page-label">SELECT A USER BELOW TO LOGIN</h3>{" "}
      {/* The class name "current-page-label" for the h3 tag above is just to take the design from the CSS */}
      <div className="all-the-users">
        {users.map((user) => {
          return (
            <div className="individual-user">
              <img className="individual-user-image" src={user.avatar_url} />
              <p>Username: {user.username}</p>
              <p>Name: {user.name}</p>
              {currentUser && currentUser.username === user.username ? (
                <button
                  data-username={user.username}
                  data-name={user.name}
                  data-avatar_url={user.avatar_url}
                  onClick={handleUserClick}
                  className="user-signed-in-button"
                  disabled
                >
                  Signed In
                </button>
              ) : (
                <button
                  data-username={user.username}
                  data-name={user.name}
                  data-avatar_url={user.avatar_url}
                  onClick={handleUserClick}
                  className="user-sign-in-button"
                >
                  Sign In
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Authentication;
