import React from "react";
import "./Auth.css";
import loginImage from "../assets/login-image.jpeg"; // Replace with the correct image

const SignIn = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Welcome back! 👋</h2>
          <label>Email Address:</label>
          <input type="email" placeholder="example@gmail.com" />
          <label>Password:</label>
          <input type="password" placeholder="At least 8 characters" />
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <button className="auth-btn">Sign In</button>
          <div className="divider">OR</div>
          <button className="google-btn">Sign In with Google</button>
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
