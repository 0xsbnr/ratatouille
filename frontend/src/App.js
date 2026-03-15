import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Drawing from "./pages/Drawing.jsx";
import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return children;
}

function App() {
  const isLoggedIn = !!localStorage.getItem("sessionToken");

  return (
    <div className="app-shell">
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/drawing"
            element={
              <ProtectedRoute>
                <Drawing />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
