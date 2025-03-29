import { useEffect, useState } from "react";
import Papa from "papaparse";

function Dashboard() {
    const [rows, setRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const SHEET_ID = "1-ljOT7r6NoDrDEQFJqFT1IRWfCS3k_ED-GVO0ycklwo";
    useEffect(() => {
      document.title = "Student Tracker Dashboard"; 
    }, []);

    useEffect(() => {
        const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

        fetch(csvUrl)
            .then((res) => res.text())
            .then((csvText) => {
                const parsed = Papa.parse(csvText, { header: false });
                setRows(parsed.data);
            })
            .catch((error) => console.error("Error fetching sheet:", error));
    }, []);

    const filteredRows = rows
        .filter((row) => {
            const name = row[0] || "";
            const flag = row[1]?.toLowerCase();
            return flag === "y" && name.toLowerCase().includes(searchTerm.toLowerCase());
        })
            .sort((a, b) => {
                const nameA = a[0].toLowerCase();
                const nameB = b[0].toLowerCase();
                const search = searchTerm.toLowerCase();

                const startsWithA = nameA.startsWith(search);
                const startsWithB = nameB.startsWith(search);

                if (startsWithA && !startsWithB) return -1;
                if (!startsWithA && startsWithB) return 1;
                return 0;
        });

    const slugify = (name) =>
        name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
                      href={`/student/${slugify(row[0])}`}
                      className="block px-4 py-2 rounded-md bg-blue-50 text-blue-800 hover:bg-blue-100 hover:text-blue-900 transition duration-150"
                    >
                      {row[0]}
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
