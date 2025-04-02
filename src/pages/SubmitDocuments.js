import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./SubmitDocuments.css";

const SubmitDocuments = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFileType(selectedFile)) {
      setFile(selectedFile);
      setMessage("");
    } else {
      setMessage("Invalid file type. Please upload a PDF, DOC, ODT, or TXT.");
    }
  };

  const validateFileType = (file) => {
    const allowedTypes = ["application/pdf", "application/msword", "text/plain"];
    return allowedTypes.includes(file.type);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && validateFileType(droppedFile)) {
      setFile(droppedFile);
      setMessage("");
    } else {
      setMessage("Invalid file type. Please upload a PDF, DOC, ODT, or TXT.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file || !description.trim()) {
      setMessage("Please upload a file and provide a description.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
  
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:1234/api/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      setMessage(data.message); // Display land found/not found message
      setFile(null);
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed.");
    } finally {
      setLoading(false);
    }
  };
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!file || !description.trim()) {
  //     setMessage("Please upload a file and provide a description.");
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("description", description);
  
    
  // setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:1234/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     const data = await response.json();
  //     setMessage(data.message);
  //     setFile(null);
  //     setDescription("");
  //   } catch (error) {
  //     console.error(error);
  //     setMessage("Upload failed.");
  //   }finally {
  //     setLoading(false);
  //   }
  // };
  

  return (
    <div className="submit-documents">
      <h2>Upload files</h2>
      <p>Select and upload the files of your choice</p>

      <form onSubmit={handleSubmit} className="upload-form">
        {/* Drag and Drop Area */}
        <div
          className={`drop-zone ${dragActive ? "active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FaCloudUploadAlt className="upload-icon" />
          <p>
            {file ? file.name : "Choose a file, drag it and drop it here"}
          </p>
          <small>PDF, DOC, ODT, TXT</small>
        </div>

        {/* File Input (Hidden) */}
        <input
          type="file"
          accept=".pdf,.doc,.odt,.txt"
          onChange={handleFileChange}
          className="file-input"
          id="fileUpload"
          aria-label="Upload File"
        />
        <label htmlFor="fileUpload" className="browse-btn">
          Browse file
        </label>

        {/* Description Field */}
        <textarea
          placeholder="Describe the document..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Document Description"
        ></textarea>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="upload-btn">
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default SubmitDocuments;
