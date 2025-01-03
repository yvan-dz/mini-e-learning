import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} E-Learning-Plattform. Alle Rechte vorbehalten. Yvan Dzefak
        </p>
        <nav className="footer-nav">
          <a href="/impressum" className="footer-link">Impressum</a>
          <a href="/datenschutz" className="footer-link">Datenschutz</a>
          <a href="/kontakt" className="footer-link">Kontakt</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
