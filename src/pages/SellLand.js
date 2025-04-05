import React, { useState } from "react";
import axios from "axios";
import "./SellLand.css";

const SellLand = () => {
  const [formData, setFormData] = useState({
    titleNumber: "",
    description: "",
    price: "",
    location: "",
    photo: null,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token =
      localStorage.getItem("token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];
    if (!token) {
      setMessage({ text: "You need to login first", type: "error" });
      return;
    }

    if (parseFloat(formData.price) <= 0) {
      setMessage({ text: "Price must be greater than 0", type: "error" });
      return;
    }

    if (!formData.photo) {
      setMessage({ text: "Please upload a photo", type: "error" });
      return;
    }

    setIsSubmitting(true);

    const data = new FormData();
    data.append("title_number", formData.titleNumber);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("location", formData.location);
    data.append("photo", formData.photo);

    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      console.log("Token being sent:", localStorage.getItem("token"));
      const response = await axios.post('http://localhost:1234/api/land-sales', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setMessage({
        text: "Land posted for sale successfully!",
        type: "success",
      });

      // Reset form
      setFormData({
        titleNumber: "",
        description: "",
        price: "",
        location: "",
        photo: null,
      });
      setPreviewImage(null);
      document.getElementById("photo-upload").value = "";

      // Optional: Redirect or do something with response.data
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to post land. Please try again.";
      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sell-land">
      <h2>Sell Your Land</h2>
      <form onSubmit={handleSubmit} className="sell-form">
        <div className="form-group">
          <label htmlFor="titleNumber">Title Number</label>
          <input
            type="text"
            id="titleNumber"
            name="titleNumber"
            placeholder="Enter title number"
            value={formData.titleNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your land"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (KES)</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price in KES"
            min="1"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo-upload">Land Photo</label>
          <input
            id="photo-upload"
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Preview" />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={isSubmitting ? "submitting" : ""}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
    </div>
  );
};

export default SellLand;
