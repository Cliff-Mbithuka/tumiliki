import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SearchRecords from "./pages/SearchRecords";
import SubmitDocuments from "./pages/SubmitDocuments";
import ReportFraud from "./pages/ReportFraud";
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
        <Route path="/report-fraud" element={<ProtectedRoute><ReportFraud /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
