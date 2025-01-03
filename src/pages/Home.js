import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>E-Learning leicht gemacht!</h1>
          <p>Erreiche deine Ziele mit unserer interaktiven Plattform.</p>
          <button className="cta-button">Jetzt Kurse entdecken</button>
        </div>
        <div className="hero-image">
          <img src="https://media.licdn.com/dms/image/v2/C4D12AQHVlQ7IzGLCiw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1629132177013?e=2147483647&v=beta&t=Q2YoVXuGpQapTs5Tlo-yflcdNXGUMUBmB_Piqo4C8Vw" alt="Learning illustration" />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Über uns</h2>
        <p>
          Unsere Plattform wurde entwickelt, um das Lernen zu revolutionieren.
          Mit interaktiven Kursen, modernem Design und einem Fokus auf
          Benutzerfreundlichkeit bieten wir dir alles, was du brauchst, um
          deine Ziele zu erreichen.
        </p>
        <div className="about-image">
          <img src="https://img.freepik.com/vecteurs-premium/education-ligne-e-learning-domicile-concept-formation-video-ligne_115495-423.jpg" alt="About us" />
        </div>
      </section>

      {/* Why Our Platform Section */}
      <section className="why-us">
        <h2>Warum unsere Plattform?</h2>
        <ul>
          <li>🔒 Sichere und zuverlässige Lernumgebung</li>
          <li>📚 Vielfältige und qualitativ hochwertige Kurse</li>
          <li>🌍 Zugriff von überall und jederzeit</li>
          <li>👩‍🏫 Unterstützung durch erfahrene Lehrkräfte</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2>Häufig gestellte Fragen (FAQ)</h2>
        <div className="faq-item">
          <h3>Wie melde ich mich an?</h3>
          <p>Klicke auf "Registrieren" und folge den Anweisungen.</p>
        </div>
        <div className="faq-item">
          <h3>Welche Kurse werden angeboten?</h3>
          <p>
            Unsere Plattform bietet Kurse zu verschiedenen Themen wie
            Programmierung, Design und mehr.
          </p>
        </div>
        <div className="faq-item">
          <h3>Kann ich die Kurse offline ansehen?</h3>
          <p>
            Derzeit unterstützen wir nur den Online-Zugang. Bleib dran für
            zukünftige Updates!
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
