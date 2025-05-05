import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as Avatars from '@dicebear/avataaars';
import { createAvatar } from '@dicebear/core';
import "./Profile.css";

export default function Profile() {
  const { language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate();
  const { userId } = useParams(); // Extract userId from URL

  const [user, setUser] = useState(null); // Stores user data
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [avatars, setAvatars] = useState([]);

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${userId}`);
        if (!response.ok) throw new Error("User not found");
        const data = await response.json();
        setUser(data);
        setNewUsername(data.username);
        setNewEmail(data.email);
        setSelectedAvatar(data.avatar || ""); // fallback if avatar missing
      } catch (err) {
        setError("Error fetching profile data");
      }
    };

    fetchUserProfile();
    generateAvatars(); // Create avatar options for editing
  }, [userId]);

  // Generate SVG avatars
  const generateAvatars = () => {
    const newAvatars = [];
    for (let i = 0; i < 6; i++) {
      const svg = createAvatar(Avatars, {
        seed: Math.random().toString(36).substring(7),
        backgroundColor: '#ffffff',
      }).toString();
      newAvatars.push(svg);
    }
    setAvatars(newAvatars);
  };

  // Toggle edit mode
  const handleEditClick = () => setIsEditing(!isEditing);

  // Save edited data to backend
  const handleSaveChanges = async () => {
    const updatedUser = {
      ...user,
      username: newUsername,
      email: newEmail,
      avatar: selectedAvatar,
    };

    try {
      const response = await fetch(`http://localhost:8000/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error("Failed to update");
      setUser({ ...user, ...updatedUser }); // Update frontend state
      setIsEditing(false); // Exit edit mode
    } catch (err) {
      setError("Error saving changes.");
    }
  };

  return (
    <div className="profile-container">
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      <h1 className="login-title">
        {language === "en" ? "Welcome to Your Profile 😊" : " 😊 مرحبًا بك في ملفك الشخصي"}
      </h1>

      {error && <div>{error}</div>}

      {!user ? (
        <div>Loading...</div>
      ) : (
        <div className="profile-details">
          {/* Avatar display */}
          {selectedAvatar && (
            <div className="profile-avatar-container">
              <div
                className="profile-avatar"
                dangerouslySetInnerHTML={{ __html: selectedAvatar }}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
          )}

          {/* User Info */}
          <p><strong>{language === "en" ? "Username:" : "اسم المستخدم:"}</strong> {user.username}</p>
          <p><strong>{language === "en" ? "Email:" : "البريد الإلكتروني:"}</strong> {user.email}</p>
          <p><strong>{language === "en" ? "Language:" : "اللغة:"}</strong> {user.language}</p>
        </div>
      )}

      {/* Edit button */}
      <button className="edit-button" onClick={handleEditClick}>
        {language === "en" ? "Edit Profile" : "تعديل الملف الشخصي"}
      </button>

      {/* Edit Form */}
      {isEditing && (
        <div className="edit-profile-container">
          <div className="input-group">
            <label>{language === "en" ? "Username" : "اسم المستخدم"}</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>{language === "en" ? "Email" : "البريد الإلكتروني"}</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>

          {/* Avatar choices */}
          <div className="avatar-selection-container">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar-item ${selectedAvatar === avatar ? 'selected' : ''}`}
                onClick={() => setSelectedAvatar(avatar.toString())}
                dangerouslySetInnerHTML={{ __html: avatar }}
              />
            ))}
          </div>

          {/* Save changes */}
          <button className="save-button" onClick={handleSaveChanges}>
            {language === "en" ? "Save Changes" : "حفظ التغييرات"}
          </button>
        </div>
      )}

      {/* Return to main page */}
      <button className="home-button primary" onClick={() => navigate("/main-page")}>
        {language === "en" ? "Back to Home" : "العودة إلى الرئيسية"}
      </button>
    </div>
  );
}
