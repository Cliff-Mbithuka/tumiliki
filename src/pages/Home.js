import React from "react";
import "./Home.css";
import heroImage from "../assets/hero-image.jpeg";

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <img src={heroImage} alt="Land" className="hero-image" />
        <div className="hero-overlay">
          <h2>TUMILIKI PROPERTIES</h2>
          <p>SEARCH VERIFY OWN</p>
        </div>
      </div>
      <div className="info">
        <div className="about">
          <h3>
            <span className="highlight">What is</span> Tumiliki Properties?
          </h3>
          <p>
            Tumiliki Properties is an AI-powered land verification
            <br /> web app that helps users verify land ownership, detect
            <br /> potential scams, and streamline the land acquisition process
            <br /> through land searches and geomapping.
          </p>
        </div>
        <div className="mission">
          <h3>
            Our <span className="highlight">Mission</span>
          </h3>
          <p>
            To empower individuals and organizations with reliable,
            <br /> AI-driven land verification solutions, ensuring transparency,
            <br /> security, and efficiency in property transactions through
            advanced land searches
            <br /> and geomapping technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
