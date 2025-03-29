import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SearchRecords.css";
import heroImage from "../assets/search.jpg";

const SearchRecords = () => {
  const [titleNumber, setTitleNumber] = useState("");
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCards, setShowCards] = useState(false);

  const pdfRef = useRef();

  // Trigger animation when the component mounts
  useEffect(() => {
    setTimeout(() => {
      setShowCards(true);
    }, 400);
  }, []);

  const handleSearch = async () => {
    if (!titleNumber.trim()) return;

    setLoading(true);
    setError("");
    setRecord(null);

    try {
      const response = await axios.get(
        `http://localhost:1234/api/land/${titleNumber}`
      );

      const data = response.data;

      // ✅ No data storage, just update state
      setRecord(data);
    } catch (err) {
      setError("Land record not found.");
    } finally {
      setLoading(false);
    }
  };

  const getFieldValue = (field) => (record && record[field] ? record[field] : "-");

  return (
    <> 
    <div className="search">
    <img src={heroImage} alt="Land" className="hero-image" />
    </div>
    <div className="search-container">
      <h1>Search Land Records</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter Title Number"
          value={titleNumber}
          onChange={(e) => setTitleNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* Cards will always be visible */}
      <div ref={pdfRef}>
        <div className="data-grid">
          <div className={`data-card ${showCards ? "fade-in" : ""}`}>
            <h3>ID:</h3>
            <p>{getFieldValue("id")}</p>

            <h3>Title Number:</h3>
            <p>{getFieldValue("title_number")}</p>

            <h3>Owner:</h3>
            <p>{getFieldValue("owner_name")}</p>

            <h3>Previous Owners:</h3>
            <p>{record?.previous_owners?.join(", ") || "-"}</p>

            <h3>Dispute Status:</h3>
            <p>{getFieldValue("dispute_status")}</p>
          </div>

          <div className={`data-card ${showCards ? "fade-in" : ""}`}>
            <h3>Land Size:</h3>
            <p>{getFieldValue("land_size")} <span>Acres</span></p>

            <h3>Location:</h3>
            <p>{getFieldValue("location")}</p>

            <h3>Latitude:</h3>
            <p>{getFieldValue("latitude")}</p>

            <h3>Longitude:</h3>
            <p>{getFieldValue("longitude")}</p>
          </div>

          <div className={`data-card ${showCards ? "fade-in" : ""}`}>
            <h3>Climate:</h3>
            <p>{getFieldValue("climate")}</p>

            <h3>Soil Type:</h3>
            <p>{getFieldValue("soil_type")}</p>

            <h3>Price:</h3>
            <p><span>KES</span> {getFieldValue("price")}</p>

            <h3>Transaction History:</h3>
            <p>{getFieldValue("transaction_history")}</p>

            <h3>Court Case Link:</h3>
            <a
              href="https://kenyalaw.org/caselaw/cases/types/57/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getFieldValue("court_case_link")}
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SearchRecords;
