import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import theGameNameHeader from "/the-name-game-header.svg";
import "./header.css";

export const Header = () => {
  return (
    <h1>
      <Link to="/" aria-label="Go back">
        <FaChevronLeft />
      </Link>
      <img src={theGameNameHeader} alt="The Name Game" />
    </h1>
  );
};
