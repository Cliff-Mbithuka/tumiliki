import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import registerImage from "../assets/register-image.jpeg";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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
      const res = await axios.post("http://localhost:1234/api/auth/register", formData);

      // Store the token in localStorage
      localStorage.setItem("token", res.data.token);

      alert("Registration successful. Redirecting to homepage...");

      // Redirect to homepage or dashboard
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "User already exists.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-form">
          <h2>Create an account</h2>

          <label>Username:</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Sarah Githinji" 
            onChange={handleChange} 
            value={formData.username}
          />

          <label>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            placeholder="example@gmail.com" 
            onChange={handleChange} 
            value={formData.email}
          />

          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            placeholder="At least 8 characters" 
            onChange={handleChange} 
            value={formData.password}
          />

          <button className="auth-btn" onClick={handleSubmit}>Sign Up</button>
        </div>
        <div className="auth-image">
          <img src={registerImage} alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;



// import React from "react";
// import "./Auth.css";
// import registerImage from "../assets/register-image.jpeg"; // Replace with the correct image

// const Register = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <div className="auth-form">
//           <h2>Create an account</h2>
//           <label>Username:</label>
//           <input type="text" placeholder="Sarah Githinji" />
//           <label>Email Address:</label>
//           <input type="email" placeholder="sarahgithinji@gmail.com" />
//           <label>Create Password:</label>
//           <input type="password" placeholder="At least 8 characters" />
//           <label>Confirm Password:</label>
//           <input type="password" placeholder="Re-enter password" />
//           <button className="auth-btn">Sign Up</button>
//         </div>
//         <div className="auth-image">
//           <img src={registerImage}  alt="Register" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
