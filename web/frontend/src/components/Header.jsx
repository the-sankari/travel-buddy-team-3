import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/css/header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid nav-container-local">
          <NavLink className="navbar-brand" to="/">
            <img
              src={logo}
              width={"100px"}
              alt="brand logo"
              className="d-inline-block align-text-center"
            />{" "}
            travel buddy
          </NavLink>
          <p>Plan. Explore. Experience the world</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav  ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/planner">
                  Trip Planner
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  My Trips
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
