
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommentsDashboard from "./pages/CommentsDashboard";
import Profile from "./pages/Profile";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<CommentsDashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;


