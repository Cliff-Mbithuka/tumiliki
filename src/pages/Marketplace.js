import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Marketplace.css";

const Marketplace = () => {
  const [lands, setLands] = useState([]);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get("http://localhost:1234/api/land-sales");
        setLands(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLands();
  }, []);

  return (
    <div className="marketplace">
      <h2>Available Land for Sale</h2>
      <div className="land-list">
        {lands.map((land) => (
          <div key={land.id} className="land-card">
            <img src={`http://localhost:1234/${land.photo_url}`} alt="Land" />
            <h3>{land.title_number}</h3>
            <p>{land.description}</p>
            <p><strong>Price:</strong> KES {land.price}</p>
            <p><strong>Location:</strong> {land.location}</p>
            <p><strong>Status:</strong> {land.is_sold ? "Sold" : "Available"}</p>

            {/* Comments Section (to be added) */}
            <button>View Comments</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
