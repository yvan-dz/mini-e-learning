import React, { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "../styles/register.css"; // Importiere das CSS für das Styling
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registrierung erfolgreich!");
    } catch (err) {
      setError("Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Registrieren</h1>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Registrieren
          </button>
        </form>
        {error && <p className="register-error">{error}</p>}
        <p className="login-text">
          Bereits ein Konto?{" "}
          <Link to="/login" className="login-link">
            Anmelden
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
