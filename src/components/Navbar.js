import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/navbar.css"; // CSS-Styles für die Navbar

const Navbar = () => {
  const [user] = useAuthState(auth); // Benutzerstatus überprüfen
  const navigate = useNavigate();

  // Logout-Handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Erfolgreich ausgeloggt!");
      navigate("/login");
    } catch (error) {
      console.error("Logout Fehler:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        E-Learning
      </div>
      <div className="navbar-links">
        <button onClick={() => navigate("/courses")} className="nav-button">
          Kurse
        </button>
        {user ? (
          <>
            {/* Admin-Button für alle angemeldeten Benutzer */}
            <button onClick={() => navigate("/admin")} className="nav-button">
              Admin
            </button>
            <span className="nav-user">Angemeldet als: {user.email}</span>
            <button onClick={handleLogout} className="nav-button logout">
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => navigate("/login")} className="nav-button">
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
