import React from "react";
import { useLocation, Link } from "react-router-dom";

function HolidayDetails() {
  const location = useLocation();
  const holiday = location.state?.holiday;

  if (!holiday) {
    return <p className="text-red-500">No holiday selected. Go back to the list.</p>;
  }

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold">{holiday.name}</h2>
      <p><strong>Date:</strong> {holiday.date.iso}</p>
      <p><strong>Description:</strong> {holiday.description || "No description available."}</p>
      <p><strong>Type:</strong> {holiday.type?.join(", ")}</p>

      <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        Back to Holiday List
      </Link>
    </div>
  );
}

export default HolidayDetails;
