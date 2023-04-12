import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="page-footer">
      <p>
        &copy;<span id="date">2023</span>
        <span className="footer-logo"> MealSharing </span>
        Built by{" "}
        <Link
          to={{ pathname: "https://www.linkedin.com/in/mdagkabir/" }}
          target="_blank"
        >
          Kabir, ReactAdict
        </Link>
      </p>
    </footer>
  );
}

export default Footer;