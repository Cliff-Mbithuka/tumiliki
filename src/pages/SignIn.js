import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import loginImage from "../assets/login-image.jpeg";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:1234/api/auth/login", formData);

      // Store token and user in local storage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error(err);
      alert("Invalid credentials.");
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:1234/api/auth/google";
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Welcome back! 👋</h2>

          <label>Email Address:</label>
          <input type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} />

          <label>Password:</label>
          <input type="password" name="password" placeholder="At least 8 characters" onChange={handleChange} />

          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>

          <button className="auth-btn" onClick={handleSubmit}>Sign In</button>
          <div className="divider">OR</div>
          <button className="google-btn" onClick={handleGoogleSignIn}>
            Sign In with Google
          </button>

          <p className="switch-auth">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
        <div className="auth-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
