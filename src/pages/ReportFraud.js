import React, { useState } from "react";
import "./ReportFraud.css";

const ReportFraud = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    fraudType: "",
    description: "",
    evidence: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, evidence: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:1234/api/report-fraud", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      setMessage(data.message);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        fraudType: "",
        description: "",
        evidence: null,
      });
    } catch (error) {
      setMessage("Error submitting report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-fraud-container">
      <h2>Report Fraud</h2>
      <form onSubmit={handleSubmit} className="report-form">
        {/* Left Column */}
        <div className="form-group left">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Fraud Type:</label>
          <select name="fraudType" value={formData.fraudType} onChange={handleChange} required>
            <option value="">Select Fraud Type</option>
            <option value="Title Deed Fraud">Title Deed Fraud</option>
            <option value="Fake Land Sales">Fake Land Sales</option>
            <option value="Ownership Dispute">Ownership Dispute</option>
          </select>
        </div>

        {/* Right Column */}
        <div className="form-group right">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Upload Evidence (Optional):</label>
          <input type="file" name="evidence" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
        </div>

        {/* Submit Button Centered */}
        <div className="submit-container">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ReportFraud;
