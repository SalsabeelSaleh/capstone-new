import React from "react";
// Importing routing components from React Router
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// Importing all your pages/components
import Home from "./components/Home";
import AboutMain from "./components/AboutMain";
import AboutHome from "./components/AboutHome";
import EmotionDetection from "./components/EmotionDetection";
import { AuthProvider } from "./context/AuthContext"; // Context for user authentication and language state
import CreateAccount from "./components/CreateAccount";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import Avatar from "./components/Avatar";
import NextPage from "./components/NextPage"; 
import Profile from "./components/Profile"; 
import HelpPage from "./components/Help";

// Component for handling logout — redirects user to login
const LogoutButton = () => {
  const navigate = useNavigate(); // hook to programmatically navigate
  return <button onClick={() => navigate("/login")}>Log Out</button>;
};

// Main App component
export default function App() {
  return (
    // Wrap entire app in AuthProvider to give all children access to global context
    <AuthProvider>
      {/* Router handles client-side routing without page reloads */}
      <Router>
        {/* Define all available routes/pages in the app */}
        <Routes>
          <Route path="/" element={<Home />} /> // Homepage
          <Route path="/create-account" element={<CreateAccount />} /> // Registration page
          <Route path="/aboutmain" element={<AboutMain />} /> // Main about page (maybe from main nav)
          <Route path="/abouthome" element={<AboutHome />} /> // About page from home screen
          <Route path="/emotion-detection" element={<EmotionDetection />} /> // Real-time AI emotion detection
          <Route path="/login" element={<LoginPage />} /> // Login page
          <Route path="/main-page" element={<MainPage />} /> // After login/registration
          <Route path="/avatar/:userId" element={<Avatar />} /> // Avatar selection after registration
          <Route path="/profile/:userId" element={<Profile />} /> // Profile view/edit
          <Route path="/Help" element={<HelpPage />} /> // Help/FAQ
          <Route path="/next-page" element={<NextPage />} /> // Optional transition screen
          <Route path="/logout" element={<LogoutButton />} /> // Logout action (custom route)
        </Routes>
      </Router>
    </AuthProvider>
  );
}
