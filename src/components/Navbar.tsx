import { Link } from "react-router-dom";
import logo from "/logo.png";

function Navbar() {
  return (
    <>
      <nav className="">
        <img src={logo} alt="logo" className="absolute h-12 ml-2 mt-1" />
        <ul className="h-14 flex flex-row justify-center items-center">
          <li className="px-6">
            <Link to="/">Home</Link>
          </li>
          <li className="px-6">
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className="px-6">
            <Link to="/scoreboard">Scoreboard</Link>
          </li>
          <li className="px-6">
            <Link to="/setup">Setup</Link>
          </li>
        </ul>
      </nav>

      <hr />
    </>
  );
}

export default Navbar;
