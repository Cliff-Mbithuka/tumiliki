import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Tumiliki Logo" />
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search-records">Search records</Link>
        </li>
        <li className="dropdown">
          <span>Submit documents ▼</span>
          <ul className="dropdown-menu">
            <li>
              <Link to="/submit-documents">Upload Documents</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contacts">Contacts</Link>
        </li>
        {user ? (
          <li className="user-section">
            <img
              src={user.image || "/user.png"}
              alt="Profile"
              className="user-profile-img"
            />
            <button className="sign-out-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/sign-in" className="sign-in">
              Sign In
            </Link>
          </li>
        )}

        {/* {user ? (
          <li className="user-section">
            <img
              src={user.image || "/user.png"}
              alt="Profile"
              className="user-profile-img"
            />
            <button className="sign-out-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </li>
        ) : (
          <li>
            <Link to="/sign-in" className="sign-in">
              Sign In
            </Link>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navbar;
