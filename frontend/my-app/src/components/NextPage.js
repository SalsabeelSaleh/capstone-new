import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NextPage.css";

export default function NextPage() {
    const [selectedAvatar, setSelectedAvatar] = useState(null); // Avatar SVG
    const navigate = useNavigate();
    const { language, toggleLanguage } = useContext(AuthContext); // Language state from context

    useEffect(() => {
        // ✅ Loads avatar from localStorage (used temporarily between pages)
        const avatar = localStorage.getItem('selectedAvatar');
        if (avatar) setSelectedAvatar(avatar);
    }, []);

    return (
        <div className="next-page-container">
            {/* Header with language toggle */}
            <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
                <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>
                <button className="login-language-switch" onClick={toggleLanguage}>
                    {language === "en" ? "العربية" : "English"}
                </button>
            </header>

            {/* Main message */}
            <h1 className="page-title">
                {selectedAvatar
                    ? (language === "en" ? "Your Selected Avatar is" : "الصورة الرمزية التي اخترتها هي")
                    : (language === "en" ? "Oops! No Avatar Selected!" : "عذرًا! لم يتم اختيار صورة رمزية!")}
            </h1>

            {/* Avatar display */}
            {selectedAvatar ? (
                <div className="avatar-display" dangerouslySetInnerHTML={{ __html: selectedAvatar }} />
            ) : (
                <p>{language === "en" ? "No avatar selected." : "لم يتم اختيار صورة رمزية."}</p>
            )}

            {/* Celebration message if avatar is selected */}
            {selectedAvatar && (
                <div className="celebration-message">
                    {language === "en"
                        ? "Great choice! 🎉 Your profile creation is completed! 🥳"
                        : " 🥳 ! اختيار رائع ! 🎉 لقد اكتمل إنشاء ملفك الشخصي "}
                </div>
            )}

            {/* Continue to main page */}
            <button
                className="nextpage-continue-button"
                onClick={() => navigate("/main-page")}
            >
                {language === "en" ? "Continue" : "استمر"}
            </button>
        </div>
    );
}
