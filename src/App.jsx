import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StudentPage from "./StudentPage";
import AddStudent from "./AddStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student/:slug" element={<StudentPage />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
