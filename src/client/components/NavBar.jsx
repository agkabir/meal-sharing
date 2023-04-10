import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/logo.png'
import { faAlignJustify, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function NavBar() {
  const [showNavLinks, setShowNavLinks] = useState(false);
    return (
      <nav className="navbar">
        <div className="leftSide">
          <Link to="/">
            <img src={logo} alt="meal sharing" />
          </Link>
        </div>

        <div className="rightSide">
          <div className="nav-links" id={showNavLinks?"hidden":""}>
            <Link to="/">
              Home
            </Link>

            <Link to="/meals">
              Meals
            </Link>

            <Link to="/reviews">
              Reviews
            </Link>
          </div>
          <button type="button" className="nav-btn" onClick={()=>setShowNavLinks(!showNavLinks)}>
            {!showNavLinks ? <FontAwesomeIcon icon={faAlignJustify} /> : <FontAwesomeIcon icon={faXmark} />}
          </button>
        </div>
      </nav>
    );    
}

export default NavBar;