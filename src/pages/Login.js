import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import "../styles/login.css"; // Importiere das CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login erfolgreich!");
    } catch (err) {
      setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Anmelden</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Anmelden
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="register-text">
          Kein Konto?{" "}
          <Link to="/register" className="register-link">
            Registrieren
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
