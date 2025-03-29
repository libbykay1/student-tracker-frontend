import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import StudentPage from "./StudentPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/student/:slug" element={<StudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
