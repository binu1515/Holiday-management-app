import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HolidayList from "./HolidayList";
import HolidayDetails from "./HolidayDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Holiday Explorer</h1>

        {/* Navigation Tabs */}
        <nav className="flex space-x-4 mb-4">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            Holiday List
          </Link>
          <Link to="/details" className="bg-green-500 text-white px-4 py-2 rounded">
            Holiday Details
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HolidayList />} />
          <Route path="/details" element={<HolidayDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
