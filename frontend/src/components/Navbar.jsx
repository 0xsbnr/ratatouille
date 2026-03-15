import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    localStorage.removeItem("groupToken");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        

        {isLoggedIn ? (
          <div className="nav-links">
            <Link to="/home" className="nav-link">
              Group Selection
            </Link>
            <Link to="/drawing" className="nav-link">
              Drawing
            </Link>
            <button onClick={handleLogout} className="nav-button primary-button">
              Log out
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Landing
            </Link>
            <Link to="/login" className="nav-button primary-button">
              Log in / Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
