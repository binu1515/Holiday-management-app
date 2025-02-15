import React, { useState } from "react";
import axios from "axios";

function App() {
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState("2024");
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/`, {
        params: { country, year },
      });
      setHolidays(response.data.response.holidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Holiday Explorer</h1>
      
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

      {holidays.length > 0 ? (
        <ul className="bg-white p-4 rounded shadow-md w-full max-w-lg">
          {holidays.map((holiday, index) => (
            <li key={index} className="border-b p-2">
              <strong>{holiday.name}</strong> - {holiday.date.iso}
            </li>
          ))}
        </ul>
      ) : (
        <p>No holidays found.</p>
      )}
    </div>
  );
}

export default App;
