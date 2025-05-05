import React, { createContext, useState, useEffect } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English
  const [userId, setUserId] = useState(null);

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  // On mount, check if user is in localStorage
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     try {
  //       const user = JSON.parse(storedUser);
  //       setUserId(user.id);
  //     } catch (error) {
  //       console.error("Error parsing stored user:", error);
  //     }
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ language, setLanguage, toggleLanguage, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};
