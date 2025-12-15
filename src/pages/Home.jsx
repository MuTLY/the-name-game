import { Link } from "react-router-dom";

import "./home.css";
import gameLogo from "../assets/images/logo.svg";

function Home() {
  return (
    <div className="home">
      <div>
        <h1 aria-label="The Name Game">The Name Game</h1>
        <Link to="/game-loop" aria-label="Go to the game">
          <img src={gameLogo} className="logo" alt="The Name Game Logo" />
        </Link>
      </div>

      <p>Try matching the employee to their photo.</p>

      <div className="card">
        <Link
          to="/game-loop"
          className="inline-block w-md text-white bg-blue-800 hover:bg-blue-700 rounded-md px-3 py-2"
          aria-label="Start the game">
          <span>Play</span>
        </Link>
      </div>
    </div>
  );
}

export default Home;
