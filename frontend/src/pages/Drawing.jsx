// Placeholder page for Drawing.jsx

import { Navigate } from "react-router-dom";

export default function Drawing() {
  const token = localStorage.getItem("sessionToken");

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return (
    <section className="page-center">
      <div className="hero-grid">
        <div>
          <h1 className="hero-title">Welcome to the Game</h1>
          <p className="hero-text">
            Please click log in or sign up to continue.
          </p>
          <></>
        </div>
      </div>
    </section>
  );
}
