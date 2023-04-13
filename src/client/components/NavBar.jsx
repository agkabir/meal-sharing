import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/images/logo.png'
import { faAlignJustify, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function NavBar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
  const { pathname } = useLocation();
    return (
      <nav className="navbar">
        <div className="leftSide">
          <Link to="/">
            <img src={logo} alt="meal sharing" />
          </Link>
        </div>

        <div className="rightSide">
          <div className="nav-links" id={showNavLinks ? "hidden" : ""}>
            <Link
              className={pathname === "/" ? "active-link" : ""}
              to="/"
              onClick={() => setShowNavLinks(!showNavLinks)}
            >
              Home
            </Link>

            <Link
              className={pathname === "/meals" ? "active-link" : ""}
              to="/meals"
              onClick={() => setShowNavLinks(!showNavLinks)}
            >
              Meals
            </Link>

            <Link
              className={pathname === "/reviews" ? "active-link" : ""}
              to="/reviews"
              onClick={() => setShowNavLinks(!showNavLinks)}
            >
              Reviews
            </Link>
          </div>
          <button
            type="button"
            className="nav-btn"
            onClick={() => setShowNavLinks(!showNavLinks)}
          >
            {!showNavLinks ? (
              <FontAwesomeIcon icon={faAlignJustify} />
            ) : (
              <FontAwesomeIcon icon={faXmark} />
            )}
          </button>
        </div>
      </nav>
    );    
}

export default NavBar;