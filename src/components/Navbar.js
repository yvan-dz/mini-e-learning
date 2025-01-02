import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

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
    <nav style={{ padding: "10px", background: "#f4f4f4" }}>
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/courses")}>Kurse</button>
      {user ? (
        <>
          <span style={{ margin: "0 10px" }}>Angemeldet als: {user.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
