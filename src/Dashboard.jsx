import { useEffect, useState, useRef } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);


    useEffect(() => {
      document.title = "Student Tracker Dashboard";
      inputRef.current?.focus();
    }, []);

  useEffect(() => {
    fetch(`${API_BASE}/students`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load students:", err);
        setError("Unable to connect to the backend.");
        setLoading(false);
      });
  }, []);


const filteredRows = rows
  .filter((row) => row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const nameA = a.name?.toLowerCase() || "";
    const nameB = b.name?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const startsWithA = nameA.startsWith(search);
    const startsWithB = nameB.startsWith(search);

    if (startsWithA && !startsWithB) return -1;
    if (!startsWithA && startsWithB) return 1;
    return 0;
  });





   return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Admin Dashboard
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Please allow up to 1 minute for backend server to wake up...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent mb-6"
            />

            {searchTerm && (
              <ul className="space-y-3">
                {filteredRows.map((row, index) => (
                  <li key={index}>
                    <a
                      href={`/student/${row.slug}`}
                      className="block px-4 py-2 rounded-md bg-blue-50 text-blue-800 hover:bg-blue-100 hover:text-blue-900 transition duration-150"
                    >
                      {row.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => (window.location.href = "/add-student")}
              className="mt-6 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add New Student
            </button>
          </>
        )}
      </div>
    </div>
  );
}



export default Dashboard;
