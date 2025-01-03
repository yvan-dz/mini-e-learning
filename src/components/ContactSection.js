import React from "react";
import "../styles/contact-section.css";

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2>Kontaktiere uns</h2>
        <p>
          Hast du Fragen oder Anregungen? Fülle das Formular aus oder kontaktiere uns direkt!
        </p>

        <div className="contact-content">
          {/* Kontaktinformationen */}
          <div className="contact-info">
            <h3>Kontaktinformationen</h3>
            <p><strong>Email:</strong> support@elearningplattform.com</p>
            <p><strong>Telefon:</strong> +49 123 456 7890</p>
            <p><strong>Adresse:</strong> Musterstraße 1, 12345 Berlin, Deutschland</p>
          </div>

          {/* Kontaktformular */}
          <form className="contact-form">
            <input
              type="text"
              placeholder="Dein Name"
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Deine Email"
              required
              className="form-input"
            />
            <textarea
              placeholder="Deine Nachricht"
              required
              className="form-textarea"
            ></textarea>
            <button type="submit" className="form-button">Senden</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
