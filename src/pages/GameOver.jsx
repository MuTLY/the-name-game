import "./game-over.css";
import gameOver from "../assets/images/grats.svg";

import { Link, useLocation } from "react-router-dom";

function GameOver({ score }) {
  const location = useLocation();
  const state = location.state;

  // If score is not passed as a prop, use the state from location
  if (score === undefined && state && state.score !== undefined) {
    score = state.score;
  } else if (score === undefined) {
    score = 0; // Default score if not provided
  }

  return (
    <div className="game-over">
      <div className="game-over-message">
        <img src={gameOver} alt="Game Over!" />

        <h2>Congratulations, you scored {score}!</h2>
      </div>

      <div className="return-home">
        <Link
          to="/"
          className="inline-block w-md text-white bg-blue-800 hover:bg-blue-700 rounded-md px-3 py-2"
          aria-label="Start the game">
          <span>Return to home</span>
        </Link>
      </div>

      <div className="card">
        <p>
          Thanks for playing! If you enjoyed this game, please consider
          contributing to the WillowTree open source community.
        </p>
      </div>
    </div>
  );
}

export default GameOver;
