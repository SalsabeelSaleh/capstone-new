import React, { useRef, useContext, useState, useEffect } from "react";
import Webcam from "react-webcam"; // For capturing live webcam feed
import { AuthContext } from "../context/AuthContext"; // Global context for language
import { useNavigate } from "react-router-dom"; // Page navigation
import "./EmotionDetection.css";
import { io } from "socket.io-client";

// Connect to Flask backend via WebSocket on port 8000
const socket = io("http://localhost:8000", {
  transports: ["websocket"], // force websocket transport
});


// Emotion translation + emoji map
const emotionTranslations = {
  angry: { ar: "غاضب", emoji: "😠" },
  disgust: { ar: "مشمئز", emoji: "🤢" },
  fear: { ar: "خائف", emoji: "😨" },
  happy: { ar: "سعيد", emoji: "😊" },
  sad: { ar: "حزين", emoji: "😢" },
  surprise: { ar: "مندهش", emoji: "😲" },
  neutral: { ar: "محايد", emoji: "😐" },
};

export default function EmotionDetection() {
  const { language, toggleLanguage } = useContext(AuthContext);
  const navigate = useNavigate();

  const webcamRef = useRef(null); // Reference to webcam component

  const [cameraAllowed, setCameraAllowed] = useState(false); // Tracks camera access
  const [cameraError, setCameraError] = useState(false); // Tracks camera error
  const [showWebcam, setShowWebcam] = useState(false); // Tracks if webcam UI should be shown
  const [emotion, setEmotion] = useState(""); // Stores predicted emotion

  // Called when user clicks "Allow Camera"
  const requestCameraAccess = () => {
    setShowWebcam(true);
  };

  // Called when webcam access is granted
  const handleUserMedia = () => {
    setCameraAllowed(true);
    setCameraError(false);
  };

  // Called when webcam access is denied
  const handleUserMediaError = (error) => {
    setCameraAllowed(false);
    setCameraError(true);
  };

  // Send webcam frames to backend every 1 second
  useEffect(() => {
    if (webcamRef.current && cameraAllowed) {
      const interval = setInterval(() => {
        const screenshot = webcamRef.current.getScreenshot(); // base64 image
        if (screenshot) {
          const cleanedScreenshot = screenshot.replace(/^data:image\/\w+;base64,/, "");
          socket.emit("video_frame", { frame: cleanedScreenshot }); // Send to Flask server
        }
      }, 1000); // every second

      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [cameraAllowed]);

  // Listen for emotion prediction from backend
  useEffect(() => {
    socket.on("emotion_result", (data) => {
      setEmotion(data.emotion); // e.g., "Happy"
    });

    // Clean up listener
    return () => {
      socket.off("emotion_result");
    };
  }, []);

  return (
    <div className="emotion-container">
      {/* Header */}
      <header className={`login-header ${language === "en" ? "rtl" : ""}`}>
        <h1 className="login-title1">{language === "en" ? "Abber" : "عَبِّرْ"}</h1>
        <button className="login-language-switch" onClick={toggleLanguage}>
          {language === "en" ? "العربية" : "English"}
        </button>
      </header>

      {/* Welcome Title */}
      <h1 className="emotion-welcome">
        {language === "en"
          ? "Welcome to Aaber Emotion Detection System 👋"
          : " 👋 مرحبًا في نظام الكشف عن المشاعر عبر "}
      </h1>

      {/* Ask for camera access if not yet granted */}
      {!showWebcam && (
        <div className="emotion-notification">
          <p className="font-semibold">🔔 Notification:</p>
          <p>
            {language === "en"
              ? "Please allow camera access to start detecting emotions."
              : "يرجى السماح بالوصول إلى الكاميرا لبدء الكشف عن المشاعر."}
          </p>
          <button className="allow-camera-btn" onClick={requestCameraAccess}>
            {language === "en" ? "Allow Camera" : "السماح بالكاميرا"}
          </button>
        </div>
      )}

      {/* Error message if webcam access fails */}
      {cameraError && (
        <div className="emotion-notification">
          <p className="font-semibold">⚠️ Error:</p>
          <p>
            {language === "en"
              ? "Could not access the camera. Please check your permissions."
              : "تعذر الوصول إلى الكاميرا. يرجى التحقق من الأذونات."}
          </p>
        </div>
      )}

      {/* Show webcam and prediction if camera is allowed */}
      {showWebcam && (
        <div className="emotion-video-container">
          <h2 className="emotion-title">
            {language === "en"
              ? "Position your face inside the frame 😊"
              : " 😊 ضع وجهك داخل الإطار "}
          </h2>
          <Webcam
            ref={webcamRef}
            className="emotion-webcam"
            style={{ width: 1600, height: 900 }}
            onUserMedia={handleUserMedia}
            onUserMediaError={handleUserMediaError}
          />

          {/* Show detected emotion */}
          {emotion && (
            <div className="emotion-output">
              <h2>
              <h2>
                {language === "en" ? (
                  `Detected Emotion: ${emotion} ${
                    emotionTranslations[emotion.toLowerCase()]?.emoji || ""
                  }`
                ) : (
                  <span dir="auto">
                    العاطفة المكتشفة:{" "}
                    {emotionTranslations[emotion.toLowerCase()]?.ar || emotion}{" "}
                    {emotionTranslations[emotion.toLowerCase()]?.emoji || ""}
                  </span>
                )}
              </h2>
                
              </h2>
            </div>
          )}
        </div>
      )}

      {/* Button to go back to home */}
      <div className="back-button-container">
        <button
          className="home-button secondary"
          onClick={() => navigate("/main-page")}
        >
          {language === "en" ? "Back to Home" : "الرجوع إلى الرئيسية"}
        </button>
      </div>
    </div>
  );
}




