import React from "react";
import "./Auth.css";
import registerImage from "../assets/register-image.jpeg"; // Replace with the correct image

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Create an account</h2>
          <label>Username:</label>
          <input type="text" placeholder="Sarah Githinji" />
          <label>Email Address:</label>
          <input type="email" placeholder="sarahgithinji@gmail.com" />
          <label>Create Password:</label>
          <input type="password" placeholder="At least 8 characters" />
          <label>Confirm Password:</label>
          <input type="password" placeholder="Re-enter password" />
          <button className="auth-btn">Sign Up</button>
        </div>
        <div className="auth-image">
          <img src={registerImage}  alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
