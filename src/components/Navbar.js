import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Tumiliki Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search-records">Search records</Link></li>
        <li className="dropdown">
          <span>Submit documents ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/submit-documents">Upload Documents</Link></li>
          </ul>
        </li>
        <li className="dropdown">
          <span>Industry Professionals ▼</span>
          <ul className="dropdown-menu">
            <li><Link to="/industry-professionals">Find Experts</Link></li>
          </ul>
        </li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/sign-in" className="sign-in">Sign in</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
