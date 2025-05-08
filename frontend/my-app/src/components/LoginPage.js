import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { language, toggleLanguage, setUserId } = useContext(AuthContext);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear old errors

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || (language === "en" ? "Password or username is incorrect 🤔" : "كلمة المرور أو اسم المستخدم غير صحيح 🤔 "));
        return;
      }

      const data = await response.json();
      setUserId(data.user.id);
      navigate("/main-page");

    } catch (err) {
      console.error("Login error:", err);
      setError(language === "en" ? "Login failed. Please try again." : "فشل تسجيل الدخول. حاول مرة أخرى.");
    }
  };

  const formFields = [
    { label: "Username:", labelAr: "اسم المستخدم:", name: "username", type: "text" },
    { label: "Password:", labelAr: "كلمة المرور:", name: "password", type: "password" },
  ];

  const orderedFields = language === "en" ? formFields : [...formFields].reverse();

  return (
    <div className="login-container">
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      <h1 className="login-title">
        {language === "en" ? "Welcome Back! Login 😊" : " 😊 مرحبًا بعودتك! تسجيل الدخول "}
      </h1>

      <form className="login-form" onSubmit={handleSubmit} dir={language === "en" ? "ltr" : "rtl"}>
        {orderedFields.map((field) => (
          <label key={field.name} className="form-label">
            {language === "en" ? field.label : field.labelAr}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
          </label>
        ))}

        {error && <p className="error">{error}</p>}

        <button type="submit" className="login-button">
          {language === "en" ? "Login" : "تسجيل الدخول"}
        </button>
      </form>

      <p className="create-account-text" onClick={() => navigate("/create-account")}>
        {language === "en" ? "Don't have an account? Create one" : "ليس لديك حساب؟ قم بإنشاء واحد"}
      </p>

      <button className="home-button primary" onClick={() => navigate("/")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}

