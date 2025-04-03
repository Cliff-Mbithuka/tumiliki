// import React, { useState, useRef } from "react";
// import "./ReportFraud.css";

// const ReportFraud = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     fraudType: "",
//     description: "",
//     evidence: null,
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null); // Use useRef instead of createRef
//   const messageTimeoutRef = useRef(null); // Store timeout reference

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, evidence: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key !== "evidence" || formData[key]) {
//         form.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await fetch("http://localhost:1234/api/report-fraud", {
//         method: "POST",
//         body: form,
//       });

//       const data = await response.json();
//       setMessage(data.message);

//       // Reset form fields
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         fraudType: "",
//         description: "",
//         evidence: null,
//       });

//       // Clear file input field
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//       // Clear any existing timeout and set a new one for 30 seconds
//       if (messageTimeoutRef.current) {
//         clearTimeout(messageTimeoutRef.current);
//       }

//       messageTimeoutRef.current = setTimeout(() => {
//         setMessage("");
//       }, 30000);
//     } catch (error) {
//       setMessage("Error submitting report.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="report-fraud-container">
//       <h2>Report Fraud</h2>
//       <form onSubmit={handleSubmit} className="report-form">
//         {/* Left Column */}
//         <div className="form-group left">
//           <label>Full Name:</label>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />

//           <label>Phone:</label>
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

//           <label>Fraud Type:</label>
//           <select name="fraudType" value={formData.fraudType} onChange={handleChange} required>
//             <option value="">Select Fraud Type</option>
//             <option value="Title Deed Fraud">Title Deed Fraud</option>
//             <option value="Fake Land Sales">Fake Land Sales</option>
//             <option value="Ownership Dispute">Ownership Dispute</option>
//           </select>
//         </div>

//         {/* Right Column */}
//         <div className="form-group right">
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//           <label>Description:</label>
//           <textarea name="description" value={formData.description} onChange={handleChange} required />

//           <label>Upload Evidence (Optional):</label>
//           <input ref={fileInputRef} type="file" name="evidence" accept=".pdf,.jpg,.png" onChange={handleFileChange} />
//         </div>

//         {/* Submit Button Centered */}
//         <div className="submit-container">
//           <button type="submit" disabled={loading} className="submit-btn">
//             {loading ? "Submitting..." : "Submit Report"}
//           </button>
//         </div>
//       </form>

//       {message && <p className="message">{message}</p>}
//     </div>
//   );
// };

// export default ReportFraud;

import React, { useState, useRef } from "react";
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
  const fileInputRef = useRef(null);
  const messageTimeoutRef = useRef(null);

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
      if (key !== "evidence" || formData[key]) {
        form.append(key, formData[key]);
      }
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

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      messageTimeoutRef.current = setTimeout(() => {
        setMessage("");
      }, 30000);
    } catch (error) {
      setMessage("Error submitting report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-fraud-container">
      <div className="form-header">
        <h2>Report Fraud</h2>
        <p className="form-subtitle">Help us combat fraud by submitting your report below</p>
      </div>
      
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-column">
          <div className="form-field">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              placeholder="Enter your full name" 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              placeholder="Enter your phone number" 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="fraudType">Type of Fraud</label>
            <select 
              id="fraudType" 
              name="fraudType" 
              value={formData.fraudType} 
              onChange={handleChange} 
              required
            >
              <option value="" disabled>Select fraud type</option>
              <option value="Title Deed Fraud">Title Deed Fraud</option>
              <option value="Fake Land Sales">Fake Land Sales</option>
              <option value="Ownership Dispute">Ownership Dispute</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-column">
          <div className="form-field">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email" 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Fraud Description</label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Provide detailed information about the fraud" 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="evidence">Supporting Evidence (Optional)</label>
            <div className="file-upload">
              <input 
                ref={fileInputRef} 
                type="file" 
                id="evidence" 
                name="evidence" 
                accept=".pdf,.jpg,.png,.doc,.docx" 
                onChange={handleFileChange} 
              />
              <label htmlFor="evidence" className="file-upload-label">
                {formData.evidence ? formData.evidence.name : "Choose file..."}
              </label>
            </div>
            <p className="file-hint">Accepted formats: PDF, JPG, PNG, DOC (Max 5MB)</p>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Report"
            )}
          </button>
        </div>
      </form>

      {message && (
        <div className={`message ${message.includes("Error") ? "error" : "success"}`}>
          {message}
          <button onClick={() => setMessage("")} className="close-message">
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportFraud;