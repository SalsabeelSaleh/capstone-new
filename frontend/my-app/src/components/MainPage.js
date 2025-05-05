import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // Global language and user ID context
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Animation library
import "./MainPage.css";

export default function MainPage() {
  const { userId, setUserId, language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle hamburger menu
  const toggleMenu = () => setIsMenuOpen((prevState) => !prevState);

  // Navigate to selected route
  const handleNavigation = (path) => navigate(path);

  // Handle logout
  const handleLogout = () => {
    setUserId(null);
    navigate("/login");
  };

  // Top nav items with dynamic language and user profile route
  const navItems = [
    { path: "/main-page", label: language === "en" ? "Home" : "الرئيسية" },
    { path: `/profile/${userId}`, label: language === "en" ? "Profile" : "الملف الشخصي" },
    // { 
    //   path: userId ? `/profile/${userId}` : "/login", 
    //   label: language === "en" ? "Profile" : "الملف الشخصي" 
    // },
    { path: "/emotion-detection", label: language === "en" ? "Emotion Detection" : "اكتشاف العواطف" },
    { path: "/about", label: language === "en" ? "About" : "عن النظام" },
    { path: "/help", label: language === "en" ? "Help" : "مساعدة" },
    {
      path: "/", 
      label: language === "en" ? "Log Out" : "تسجيل الخروج",
      action: handleLogout,
    }
  ];

  const orderedNavItems = language === "en" ? navItems : [...navItems].reverse();

  return (
    <div className="mainpage-container">
      <header className="login-header">
        <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>

        <nav className="mainpage-nav">
          {orderedNavItems.map((item) => (
            <a
              key={item.path}
              href="#"
              className="mainpage-link"
              onClick={() => {
                if (item.action) item.action();
                else handleNavigation(item.path);
              }}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile menu button */}
          <button className="hamburger-icon" onClick={toggleMenu}>
            &#9776;
          </button>

          {/* Language toggle */}
          <button className="login-language-switch" onClick={toggleLanguage}>
            {language === "en" ? "العربية" : "English"}
          </button>
        </nav>
      </header>

      {/* Dropdown menu (mobile only) */}
      <nav className={`mainpage-nav-dropdown ${isMenuOpen ? "open" : ""}`}>
        {orderedNavItems.map((item) => (
          <a
            key={item.path}
            href="#"
            className="mainpage-link"
            onClick={() => {
              if (item.action) item.action();
              else handleNavigation(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Hero section */}
      <section className="hero-section">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {language === "en"
            ? "Helping Children Understand Emotions"
            : "مساعدة الأطفال على فهم العواطف"}
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {language === "en"
            ? "An AI-powered tool designed to assist children with autism in recognizing facial emotions. It provides real-time emotion detection, allowing children to understand expressions better and interact more confidently."
            : " أداة مدعومة بالذكاء الاصطناعي لمساعدة الأطفال المصابين بالتوحد في التعرف على العواطف. توفر تقنية اكتشاف المشاعر في الوقت الفعلي، مما يساعد الأطفال على فهم التعابير بشكل أفضل والتفاعل بثقة"}
        </motion.p>

        {/* CTA button */}
        <motion.button
          className="hero-button"
          //================================
          //================================
          onClick={() => navigate("/EmotionDetection")}
          //================================
          //================================
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "Start Detecting Emotions !" : " ! ابدأ في اكتشاف العواطف "}
        </motion.button>
      </section>

      {/* Emotion cards (Happy, Sad, etc.) */}
      <section className="emotion-cards">
        {["Happy", "Sad", "Surprised", "Angry", "Confused"].map((emotion) => (
          <motion.div key={emotion} className="emotion-card" whileHover={{ scale: 1.1 }}>
            <p>{language === "en" ? emotion : translateEmotion(emotion)}</p>
            <img src={`/images/${emotion.toLowerCase()}.jpg`} alt={emotion} />
          </motion.div>
        ))}
      </section>

      {/* Why it matters */}
      <section className="about-emotions">
        <motion.h2
          className="about-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {language === "en" ? "Why Emotion Detection?" : "لماذا اكتشاف العواطف؟"}
        </motion.h2>
        <motion.p
          className="about-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {language === "en"
            ? "Children with autism often struggle with recognizing facial expressions, making social interactions challenging. Our AI-driven tool helps bridge this gap, enabling them to better understand emotions in a fun and engaging way."
            : ".يواجه الأطفال المصابون بالتوحد صعوبة في التعرف على تعابير الوجه، مما يجعل التفاعل الاجتماعي أكثر تحديًا. تساعد أداتنا المدعومة بالذكاء الاصطناعي في سد هذه الفجوة، مما يمكنهم من فهم العواطف بطريقة ممتعة وتفاعلية"}
        </motion.p>

        <motion.button
          className="learn-more-button"
          onClick={() => navigate("/about")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {language === "en" ? "Learn More" : "اعرف المزيد"}
        </motion.button>
      </section>
    </div>
  );
}

// Utility function to translate emotion labels manually
function translateEmotion(emotion) {
  const map = {
    Happy: "سعيد",
    Sad: "حزين",
    Surprised: "مندهش",
    Angry: "غاضب",
    Confused: "مرتبك"
  };
  return map[emotion] || emotion;
}
