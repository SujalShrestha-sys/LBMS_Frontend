import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Librarian/Dashboard.jsx";
import ManageBooks from "./pages/Librarian/ManageBooks.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default redirect to dashboard */}
        <Route path="/" element={<Navigate to="/librarian/dashboard" />} />

        {/* Librarian Dashboard */}
        <Route path="/librarian/dashboard" element={<Dashboard />} />
        <Route path="/librarian/manageBooks" element={<ManageBooks />} />

        {/* Fallback 404 */}
        <Route path="*" element={<div className="p-6 text-center text-red-600">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;