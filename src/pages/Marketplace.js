import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import "./Marketplace.css";

const Marketplace = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1234/api/land-sales"
        );
        console.log(
          "Land data with seller IDs:",
          response.data.map((land) => ({
            id: land.id,
            seller_id: land.seller_id,
          }))
        );
        setLands(response.data);
      } catch (error) {
        setMessage("Failed to load land listings");
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  console.log("Current auth user:", {
    id: user?.id,
    userId: user?.userId, // Common JWT field
    user_id: user?.user_id, // Another common format
  });

  const handleDelete = async (landId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }
  
    try {
      const response = await axios.delete(
        `http://localhost:1234/api/land-sales/${landId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
  
      if (response.data.success) {
        setLands(prev => prev.filter(land => land.id !== landId));
        setMessage('Listing deleted successfully');
      }
    } catch (error) {
      const serverMessage = error.response?.data?.message;
      const errorMsg = serverMessage || 'Deletion failed. Please try again.';
      setMessage(errorMsg);
      
      console.error('Delete failed:', {
        status: error.response?.status,
        message: serverMessage,
        landId,
        userId: user?.id
      });
    }
  };

  // Enhanced owner check function
  const isOwner = (land) => {
    const userId = user?.id || user?.userId || user?.user_id;
    return (
      userId &&
      land.seller_id &&
      userId.toString() === land.seller_id.toString()
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="marketplace">
      <h2>Lands on Sale</h2>
      {message && (
        <div
          className={`message ${
            message.includes("Failed") ? "error" : "success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="land-grid">
        {lands.map((land) => (
          <div key={land.id} className="land-card">
            <img
              src={land.photo_url || "/default-land.jpg"}
              alt={land.title_number}
              className="land-image"
            />
            <div className="land-details">
              <h3>{land.title_number}</h3>
              <p>Location: {land.location}</p>
              <p>Price: KES {land.price?.toLocaleString()}</p>
              <p>{land.description}</p>

              {/* Debug info - remove after fixing */}
              <div
                className="debug-info"
                style={{ fontSize: "12px", color: "gray" }}
              >
                Land Owner ID: {land.seller_id}
                <br />
                Your ID: {user?.id || user?.userId || user?.user_id}
              </div>

              {isOwner(land) && (
                <button
                  onClick={() => handleDelete(land.id)}
                  className="delete-btn"
                >
                  Delete Listing
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
