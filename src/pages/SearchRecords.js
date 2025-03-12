import React, { useState } from "react";
import "./SearchRecords.css";

const SearchRecords = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);

    setTimeout(() => {
      const dummyResults = [
        { id: 1, title: "Plot 123", owner: "John Doe", location: "Nairobi" },
        { id: 2, title: "Land 456", owner: "Jane Smith", location: "Mombasa" },
      ];

      const filteredResults = dummyResults.filter(
        (record) =>
          record.title.toLowerCase().includes(query.toLowerCase()) ||
          record.owner.toLowerCase().includes(query.toLowerCase()) ||
          record.location.toLowerCase().includes(query.toLowerCase())
      );

      setResults(filteredResults);
      if (filteredResults.length === 0) setError("No records found.");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="search-container">
      <h2>Search Land Records</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter title number, owner name, or location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">Searching...</p>}
      {error && <p className="error">{error}</p>}
      <div className="results">
        {results.map((record) => (
          <div key={record.id} className="record">
            <h3>{record.title}</h3>
            <p><strong>Owner:</strong> {record.owner}</p>
            <p><strong>Location:</strong> {record.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecords;
