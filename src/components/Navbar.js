import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/sign-in");
  };

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

        {user ? (
          <>
            <img 
              src={user.image || "/user.png"} 
              alt="Profile" 
              className="user-profile-img"
            />
            <button className="sign-out-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <li>
            <Link to="/sign-in" className="sign-in">
              Sign In
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
