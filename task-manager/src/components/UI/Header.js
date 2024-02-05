import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  const username = localStorage.getItem("name");
  return (
    <header>
      <h1>Hi, {username}</h1>
      <Link to="/">
        <button>Log Out</button>
      </Link>
    </header>
  );
};

export default Header;
