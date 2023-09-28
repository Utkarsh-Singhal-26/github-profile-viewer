import { useEffect, useState } from "react";
import axios from "axios";
import Box from "./box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";

let formatDate = (inputDate) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(inputDate);

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const App = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState('nitay')
  const [click, setClick] = useState(true)

  useEffect(() => {
    if (click) {
      axios.get(`https://api.github.com/users/${profile}`).then((res) => {
        setUser(res.data);
      });
      setClick(prevClick => !prevClick)
    }
  }, [click, profile]);

  return (
    <main>
      <div className="search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search the Github Profile"
          name="profile"
          value={profile}
          onChange={(event) => setProfile(event.target.value)}
        />
        <button onClick={() => { setClick(prevClick => !prevClick) }}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1.5em"
            width="1.5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z"
              clipRule="evenodd"
            ></path>
            <path
              fillRule="evenodd"
              d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      {user.length !== 0 && (
        <div className="github">
          <div
            className="image"
            style={{ backgroundImage: `url(${user.avatar_url})` }}
          ></div>
          <h1 className="name">{user.name}</h1>
          <h3 className="userid">@{user.login}</h3>
          <div className="info">
            {user.location && (
              <div>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#ffffff" }}
                  className="icon"
                />
                <p>{user.location}</p>
              </div>
            )}
            <div>
              <FontAwesomeIcon
                icon={faCalendarDays}
                style={{ color: "#ffffff" }}
                className="icon"
              />
              <p>Joined {formatDate(`${user.created_at}`)}</p>
            </div>
          </div>
          <div className="container">
            <Box number={user.followers} string="followers" />
            <Box number={user.following} string="following" />
            <Box number={user.public_repos} string="repositories" />
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
