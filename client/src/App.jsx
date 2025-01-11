import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { Dashboard, Login } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard_login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
