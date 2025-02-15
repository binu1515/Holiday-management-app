import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HolidayList() {
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState("2024");
  const [holidays, setHolidays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const holidaysPerPage = 10;
  const navigate = useNavigate();

  // Fetch Holidays API
  const fetchHolidays = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/", {
        params: { country, year },
      });
      setHolidays(response.data.response.holidays);
      setCurrentPage(1); // Reset page when new data is fetched
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  // Pagination Logic
  const indexOfLastHoliday = currentPage * holidaysPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - holidaysPerPage;
  const currentHolidays = holidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

  return (
    <div className="w-full max-w-lg">
      {/* Input Fields */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Country Code (e.g., US)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={fetchHolidays} className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>

      {/* Display Holidays */}
      {currentHolidays.length > 0 ? (
        <>
          <ul className="bg-white p-4 rounded shadow-md">
            {currentHolidays.map((holiday, index) => (
              <li
                key={index}
                className="border-b p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => navigate(`/details`, { state: { holiday } })}
              >
                <strong>{holiday.name}</strong> - {holiday.date.iso}
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Previous
            </button>
            <span className="px-4 py-2">Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage((prev) => (indexOfLastHoliday < holidays.length ? prev + 1 : prev))}
              disabled={indexOfLastHoliday >= holidays.length}
              className={`px-4 py-2 rounded ${indexOfLastHoliday >= holidays.length ? "bg-gray-300" : "bg-blue-500 text-white"}`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>No holidays found.</p>
      )}
    </div>
  );
}

export default HolidayList;
