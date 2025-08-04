import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

function AddStudent() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);
    useEffect(() => {
      document.title = "Add Student";
    }, []);
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name.trim()) {
    setStatus("Name cannot be empty.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Failed to add student");

    navigate("/"); // Redirect to dashboard
  } catch (err) {
    setStatus("Error: " + err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-700">Add New Student</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          ref={inputRef}
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Student
          </button>
        </form>

        {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  );
}

export default AddStudent;
