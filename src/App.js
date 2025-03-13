import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchRecords from "./pages/SearchRecords";
import SubmitDocuments from "./pages/SubmitDocuments";
import IndustryProfessionals from "./pages/IndustryProfessionals";
import Contacts from "./pages/Contacts";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<Contacts />} />
        
        {/* Protected Routes */}
        <Route path="/search-records" element={<ProtectedRoute><SearchRecords /></ProtectedRoute>} />
        <Route path="/submit-documents" element={<ProtectedRoute><SubmitDocuments /></ProtectedRoute>} />
        <Route path="/industry-professionals" element={<ProtectedRoute><IndustryProfessionals /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
