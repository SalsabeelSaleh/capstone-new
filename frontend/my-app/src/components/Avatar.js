import React, { useContext, useState, useEffect } from "react";
// For navigation and reading URL params
import { useNavigate, useParams } from "react-router-dom";
// Global language context
import { AuthContext } from "../context/AuthContext";
// Importing Dicebear avatar generator
import * as Avatars from '@dicebear/avataaars';
import { createAvatar } from '@dicebear/core';
import "./Avatar.css";

export default function Avatar() {
    // Get language state and toggle function from context
    const { language, toggleLanguage } = useContext(AuthContext);

    // Get user ID from URL path like /avatar/:userId
    const { userId } = useContext(AuthContext);
    const navigate = useNavigate();

    // State: list of generated avatars
    const [avatars, setAvatars] = useState([]);
    // State: currently selected avatar
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // Function to create 6 random avatars
    const generateAvatars = () => {
        const newAvatars = [];
        for (let i = 0; i < 6; i++) {
            const svg = createAvatar(Avatars, {
                seed: Math.random().toString(36).substring(7), // Random seed
                backgroundColor: '#ffffff',
                width: 200,
                height: 200,
            });
            newAvatars.push(svg.toString()); // Convert to raw SVG string
        }
        setAvatars(newAvatars);
    };

    // Generate avatars on component mount
    useEffect(() => {
        generateAvatars();
    }, []);

    // When user clicks an avatar, mark it as selected
    const handleAvatarSelect = (index) => {
        setSelectedAvatar(avatars[index]);
    };

    // Regenerate avatars if user wants to change options
    const regenerateAvatars = () => {
        generateAvatars();
        setSelectedAvatar(null);
    };

    // When user clicks continue, send selected avatar to backend and redirect
    const handleContinue = async () => {
        try { 
            const response = await fetch(`http://localhost:8000/user/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ avatar: selectedAvatar }), // Save as string
            });

            if (!response.ok) throw new Error("Failed to update avatar");

            // Go to main page after saving avatar
            navigate('/main-page');
        } catch (error) {
            console.error("Avatar update failed", error);
        }
    };

    return (
        <div className="avatar-container">
            {/* Header with title and language toggle */}
            <header className="login-header">
                <h1 className="login-title1">
                    {language === "ar" ? "عَبِّرْ" : "Abber"}
                </h1>
                <button className="login-language-switch" onClick={toggleLanguage}>
                    {language === "ar" ? "English" : "العربية"}
                </button>
            </header>

            {/* Instructional header */}
            <div className="avatar-title-container">
                <h1 className="avatar-title">
                    {language === "ar"
                        ? "😊 هل أنت مستعد لاختيار صورتك الرمزية؟"
                        : "Ready to choose your avatar? 😊"}
                </h1>
            </div>

            {/* Avatar selection instruction */}
            <div className="avatar-instruction">
                {language === "ar"
                    ? " 👇 من فضلك اختر صورتك الرمزية "
                    : "Kindly select your avatar 👇"}
            </div>

            {/* Display avatar options */}
            <div className="avatar-collection-container">
                {avatars.length > 0 && (
                    <div className="avatar-collection">
                        {avatars.map((avatar, index) => (
                            <div
                                key={index}
                                className={`avatar-item ${selectedAvatar === avatar ? 'selected' : ''}`}
                                onClick={() => handleAvatarSelect(index)}
                                dangerouslySetInnerHTML={{ __html: avatar }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Regenerate and Continue buttons */}
            <div className="buttons-container-horizontal">
                <button className="avatar-button-regenerate" onClick={regenerateAvatars}>
                    {language === "ar" ? "تجديد الصور الرمزية" : "Regenerate Avatars"}
                </button>

                <button
                    className="continue-button"
                    onClick={handleContinue}
                    disabled={!selectedAvatar}
                >
                    {language === "ar" ? "استمرار" : "Continue"}
                </button>
            </div>

            {/* Navigation buttons */}
            <div className="buttons-container">
                <button className="avatar-button primary" onClick={() => navigate("/")}>
                    {language === "ar" ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
                <button className="avatar-button secondary" onClick={() => navigate("/create-account")}>
                    {language === "ar" ? "العودة إلى إنشاء الحساب" : "Back to Create Account"}
                </button>
            </div>
        </div>
    );
}
