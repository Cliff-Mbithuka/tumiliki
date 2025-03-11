import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import logo from "../assets/logo.png"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <img  alt="Tumiliki Logo" className="logo" />
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search records</Link></li>
        <li><Link to="/submit">Submit documents</Link></li>
        <li><Link to="/professionals">Industry Professionals</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/signin">Sign in</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
