import React from "react";
import "./Home.css";
import heroImage from "../assets/hero-image.jpeg";

const Home = () => {
  return (
    <>
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
    {/* New Section Start */}
      <div className="land-verification-section">
        <div className="land-verification-header">
          <h2>Comprehensive Land Verification Solutions</h2>
          <p>
            Our platform provides all the tools you need to ensure safe and
            legitimate land transactions in Kenya.
          </p>
        </div>
        <div className="land-verification-cards">
          <div className="card"> 
            <h3>🔍 Instant Title Verification</h3>
            <p>
              Verify land ownership and title deed authenticity in real-time
              through official registry connections.
            </p>
          </div>
          <div className="card">
            <h3>📃 Document Authentication</h3>
            <p>
              Check if land documents are genuine and officially recognized by
              Kenyan authorities.
            </p>
          </div>
          <div className="card">
            <h3>⛔ Fraud Reporting</h3>
            <p>
              Report suspicious land dealings and track the status of your
              complaints.
            </p>
          </div>
          <div className="card">
            <h3>⚖️ Legal Connections</h3>
            <p>
              Connect with verified land lawyers who can help with your
              property transactions.
            </p>
          </div>
          <div className="card">
            <h3>📍 Property Mapping</h3>
            <p>
              View property boundaries and geographical information to confirm
              land locations.
            </p>
          </div>
          <div className="card">
            <h3>📖 Educational Resources</h3>
            <p>
              Access comprehensive information about land rights, laws, and
              procedures in Kenya.
            </p>
          </div>
          <div className="card">
            <h3>🍂 Secure Authentication</h3>
            <p>
              Two-factor authentication and identity verification protect your
              information.
            </p>
          </div>
          <div className="card">
            <h3>⌛ Real-time Updates</h3>
            <p>
              Receive alerts about changes to land records or potential fraud
              indicators.
            </p>
          </div>
        </div>
      </div>
      {/* New Section End */}
      <section className="impact-section">
      <div className="impact-header">
       
        <h2>Making an Impact on Land Security</h2>
        <p className="impact-subtitle">
          Our platform is helping Kenyans secure their land and prevent fraud across the country.
        </p>
      </div>

      <div className="impact-stats-container">
        <div className="impact-stat">
        <p className="emoji">✅</p>
          <h3 className="stat-number">500,000+</h3>
          <p className="stat-label">Properties Verified</p>
          <p className="stat-description">Successfully verified properties across Kenya</p>
        </div>

        <div className="impact-stat">
          <p className="emoji">🧑‍🤝‍🧑</p>
          <h3 className="stat-number">75,000+</h3>
          <p className="stat-label">Registered Users</p>
          <p className="stat-description">Trusted by property owners and buyers</p>
        </div>

        <div className="impact-stat">
          <p className="emoji">❌</p>
          <h3 className="stat-number">12,500+</h3>
          <p className="stat-label">Fraud Cases Prevented</p>
          <p className="stat-description">Saving Kenyans from land fraud</p>
        </div>

        <div className="impact-stat">
          <p className="emoji">📍</p>
          <h3 className="stat-number">47</h3>
          <p className="stat-label">Counties Covered</p>
          <p className="stat-description">Nationwide coverage across Kenya</p>
        </div>
      </div>
    </section>

    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">Tumiliki</h2>
          <p className="footer-mission">
            Combating land fraud and promoting transparent real estate transactions in Kenya through secure digital verification.
          </p>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h3 className="footer-heading">SERVICES</h3>
            <ul className="footer-links">
              <li><a href="/land-verification">Land Verification</a></li>
              <li><a href="/fraud-reporting">Fraud Reporting</a></li>
              <li><a href="/legal-resources">Legal Resources</a></li>
              <li><a href="/find-lawyer">Find a Lawyer</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">QUICK LINKS</h3>
            <ul className="footer-links">
              <li><a href="/about">About Us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3 className="footer-heading">CONTACT US</h3>
            <address className="footer-contact">
              <p>📍 Nairobi, Kenya</p>
              <p>📞 +254 700 000 000</p>
              <p>📩 <a href="mailto:info@ardhiamani.co.ke">info@tumiliki.co.ke</a></p>
            </address>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 TumilikiProperties. All rights reserved.</p>
      </div>
    </footer>
      </>
  );
};

export default Home;
