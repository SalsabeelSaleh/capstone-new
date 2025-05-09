import React, { useContext } from "react"; // React core and context API
import { useNavigate } from "react-router-dom"; // Hook for client-side navigation
import { AuthContext } from "../context/AuthContext"; // Language context provider
import "./Home.css"; // Styling for the home page

// Home component
export default function Home() {
  const navigate = useNavigate(); // Navigate function from React Router
  const { language, toggleLanguage } = useContext(AuthContext); // Get language setting and toggle from context

  // Button definitions for English and Arabic
  const buttons = [
    {
      path: "/create-account",
      label: language === "en" ? "Get Started" : "ابدأ ",
      primary: true, // Styling condition
    },
    {
      path: "/abouthome",
      label: language === "en" ? "Learn More" : "تعرف أكثر",
      primary: false,
    },
  ];

  // Reverse button order in Arabic for RTL layout
  const orderedButtons = language === "en" ? buttons : [...buttons].reverse();

  return (
    <div className="home-container">
      {/* Top bar with logo and language switch */}
      <header className="login-header">
        <h1 className="login-title1">
          {language === "en" ? "Abber" : "عَبِّرْ"}
        </h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* === Main Content Section === */}
      <main className="home-main">
        <div className="home-content">
          {/* === Welcome Message === */}
          <div className="home-text">
            <h1 className="home-welcome">
              {language === "en"
                ? "Welcome to Abber"
                : "مرحبًا بكم في عَبِّرْ"}
            </h1>

            {/* Tagline Text */}
            <p className="home-description">
              {language === "en" ? (
                <>
                  <span className="home-line">EMPOWERING CHILDREN WITH</span> <br />
                  <span className="home-line">AUTISM THROUGH EMOTION</span> <br />
                  <span className="home-line">DETECTION TECHNOLOGY.</span>
                </>
              ) : (
                <>
                  <span className="home-line">تمكين الأطفال المصابين</span> <br />
                  <span className="home-line">بالتوحد من خلال تقنية</span> <br />
                  <span className="home-line">.اكتشاف العواطف</span>
                </>
              )}
            </p>

            {/* Buttons for navigation */}
            <div className="home-buttons">
              {orderedButtons.map((button) => (
                <button
                  key={button.path}
                  className={`home-button ${button.primary ? "primary" : "secondary"}`}
                  onClick={() => navigate(button.path)} // Navigate on click
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          {/* Illustration image */}
          <img
            src="/images/img1.png"
            alt={
              language === "en"
                ? "Emotion Detection Illustration"
                : "رسم توضيحي لاكتشاف العواطف"
            }
            className="home-image"
          />
        </div>
      </main>
    </div>
  );
}
