import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Drawing from "./pages/Drawing";
import "./App.css";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("sessionToken");

  if (!token) {
    return <Navigate to="/login" replace />;
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
