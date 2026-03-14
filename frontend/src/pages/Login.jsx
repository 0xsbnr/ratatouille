import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const existingToken = localStorage.getItem("sessionToken");

  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (existingToken) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("sessionToken", `session-${username}`);
    localStorage.setItem("username", username);

    navigate("/home");
    window.location.reload();
  };

  return (
    <section className="auth-wrapper">
      <div className="auth-card">
        <div className="tab-switcher">
          <button
            className={mode === "login" ? "tab active-tab" : "tab"}
            onClick={() => setMode("login")}
          >
            Log in
          </button>
          <button
            className={mode === "signup" ? "tab active-tab" : "tab"}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        <h1>{mode === "login" ? "Log in" : "Sign up"}</h1>
        <p className="muted-text">
          Please enter your username and password to play!
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="primary-button full-width">
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>
      </div>
    </section>
  );
}
