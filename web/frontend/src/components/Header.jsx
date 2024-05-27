import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Travel Buddy</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/planner">Trip Planner</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
