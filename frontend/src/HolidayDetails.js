import React from "react";
import { useLocation, Link } from "react-router-dom";

function HolidayDetails() {
  const location = useLocation();
  const holiday = location.state?.holiday;

  if (!holiday) {
    return (
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
        <p>No holiday selected. Go back to the <Link to="/" className="text-blue-500">Holiday List</Link>.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-2">{holiday.name}</h2>
      <p><strong>Date:</strong> {holiday.date.iso}</p>
      <p><strong>Description:</strong> {holiday.description || "No description available"}</p>
      <Link to="/" className="block mt-4 text-blue-500">Back to Holiday List</Link>
    </div>
  );
}

export default HolidayDetails;
