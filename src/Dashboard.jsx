import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      document.title = "Student Tracker Dashboard";
    }, []);

useEffect(() => {
  fetch(`${API_BASE}/students`)
        .then((res) => res.json())
        .then(setRows)
        .catch((err) => console.error("Failed to load students:", err));
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

            <input
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
          </div>
        </div>
      );

}

export default Dashboard;
