import React from "react";
import { Link } from "react-router-dom";
function NavBar() {
    return (
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/" className="nav-link">
            home
          </Link>

          <Link to="/meals" className="nav-link">
            meals
          </Link>

          <Link to="/reviews" className="nav-link">
            reviews
          </Link>
        </div>
      </nav>
    );    
}

export default NavBar;