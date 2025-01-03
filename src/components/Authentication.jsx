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
    document.cookie = "user=; max-age=0; path=/";
    document.cookie = `user=${encodeURIComponent(
      JSON.stringify(user)
    )}; max-age=${7 * 24 * 60 * 60}`;
  }

  useEffect(() => {
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
        {users.map((user, index) => {
          return (
            <div className="individual-user" key={index}>
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
