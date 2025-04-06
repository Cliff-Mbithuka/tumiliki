import React, { useState } from "react";
import axios from "axios";
import "./SellLand.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Only image files are allowed", type: "error" });
      return;
    }

    setFormData((prev) => ({ ...prev, photo: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const getAuthToken = () => {
    return (
      localStorage.getItem("token") ||
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1]
    );
  };

  const validateForm = () => {
    if (!formData.titleNumber || !formData.description || 
        !formData.price || !formData.location || !formData.photo) {
      setMessage({ text: "All fields are required", type: "error" });
      return false;
    }

    if (parseFloat(formData.price) <= 0 || isNaN(parseFloat(formData.price))) {
      setMessage({ text: "Please enter a valid price greater than 0", type: "error" });
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormData({
      titleNumber: "",
      description: "",
      price: "",
      location: "",
      photo: null,
    });
    setPreviewImage(null);
    document.getElementById("photo-upload").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getAuthToken();

    if (!token) {
      setMessage({ text: "You need to login first", type: "error" });
      navigate("/login");
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title_number", formData.titleNumber);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", parseFloat(formData.price).toFixed(2));
    formDataToSend.append("location", formData.location);
    formDataToSend.append("photo", formData.photo, formData.photo.name);

    try {
      await axios.post(
        "http://localhost:1234/api/land-sales",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMessage({
        text: "Land posted for sale successfully!",
        type: "success",
      });
      
      resetForm();
      setTimeout(() => navigate("/marketplace"), 1500);

    } catch (error) {
      console.error("Submission error:", error);
      
      let errorMsg = "Failed to post land. Please try again.";
      if (error.response?.status === 401) {
        errorMsg = "Session expired. Please login again";
        localStorage.removeItem("token");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => navigate("/login"), 1500);
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }

      setMessage({ text: errorMsg, type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sell-land">
      <h2>Sell Your Land</h2>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="sell-form">
        <div className="form-group">
          <label htmlFor="titleNumber">Title Number *</label>
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
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your land"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (KES) *</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter price in KES"
            min="1"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
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
          <label htmlFor="photo-upload">Land Photo *</label>
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
          className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit Listing"
          )}
        </button>
      </form>
    </div>
  );
};

export default SellLand;