import { Link } from "react-router-dom";

import "./home.css";
import gameLogo from "../assets/images/logo.svg";

function NotFound() {
  return (
    <div className="home">
      <div>
        <h1 aria-label="The Name Game">The Name Game</h1>
        <Link to="/" aria-label="Go back to home">
          <img
            src={gameLogo}
            className="logo"
            style={{ width: "250px", height: "250px" }}
            alt="The Name Game Logo"
          />
        </Link>
      </div>

      <h2>404 Not Found</h2>

      <div className="card">
        <Link
          to="/"
          className="play-buttonx text-white bg-blue-900 hover:bg-blue-700 rounded-md px-3 py-2">
          <span>Go Back</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
