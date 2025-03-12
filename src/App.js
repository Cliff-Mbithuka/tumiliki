import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchRecords from "./pages/SearchRecords";
import SubmitDocuments from "./pages/SubmitDocuments";
import IndustryProfessionals from "./pages/IndustryProfessionals";
import Contacts from "./pages/Contacts";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-records" element={<SearchRecords />} />
        <Route path="/submit-documents" element={<SubmitDocuments />} />
        <Route path="/industry-professionals" element={<IndustryProfessionals />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
