import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contacts.css";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:1234/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
  
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Something went wrong. Try again later.");
    }
  };
  

  return (
    <div className="contacts">
  <h2 className="contact-title">Contact Us</h2>
  <p className="contact-subtitle">Talk to our customer care today!</p>

  {/* Flex Container */}
  <div className="contact-container">
    {/* Left: Contact Details */}
    <div className="contact-left">
      <div className="contact-box">

        <h3 className="contact-heading">Contact Details</h3>
        <p className="contact">
          <FaEnvelope className="icon" /> <a className="email" href="mailto:tumiliki@gmail.com">info@tumiliki.co.ke</a>
        </p>
        <p className="contact">
          <FaPhone className="icon" /> +254 256 373 498
        </p>
      </div>

      <div className="contact-box">
        <FaMapMarkerAlt className="contact-icon" />
        <h3 className="contact-heading">Location</h3>
        <p>Nairobi, Kenya</p>
      </div>
    </div>

    {/* Right: Contact Form */}
    <div className="contact-right">
      <div className="contact-form-box">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>

          <button type="submit">Send Message</button>
        </form>

        {submitted && <p className="success-msg">Message sent successfully!</p>}
      </div>
    </div>
  </div>
</div>

  );
};

export default Contacts;
