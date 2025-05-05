// React core hooks
import React, { useState, useContext } from "react";
// Router hook to navigate after successful registration
import { useNavigate } from "react-router-dom";
// Import stylesheet for this page
import "./CreateAccount.css";
// Language and userId context
import { AuthContext } from "../context/AuthContext";

function CreateAccount() {
    const navigate = useNavigate(); // to navigate between pages
    const { setUserId } = useContext(AuthContext); // save userId in context after registration

    // Determine language toggle (used for labels and UI direction)
    const [isArabic, setIsArabic] = useState(false);

    // Track input fields
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // Track validation errors
    const [errors, setErrors] = useState({});

    // Switch between English and Arabic
    const toggleLanguage = () => {
        setIsArabic((prev) => !prev);
    };

    // Handle changes to form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Basic validation logic
        if (!formData.username) {
            newErrors.username = isArabic ? "الرجاء إدخال اسم المستخدم" : "Please enter a username";
        }
        if (!formData.email) {
            newErrors.email = isArabic ? "الرجاء إدخال البريد الإلكتروني" : "Please enter an email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email format";
        }
        if (!formData.password) {
            newErrors.password = isArabic ? "الرجاء إدخال كلمة المرور" : "Please enter a password";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match";
        }

        // Show errors if found
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        // Call backend API to register user
        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    language: isArabic ? "ar" : "en"
                })
            });

            if (!response.ok) throw new Error("Registration failed");

            // If successful, store userId and redirect to avatar selection
            const result = await response.json();
            setUserId(result.user.id);
            navigate(`/avatar/${result.user.id}`);
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed.");
        }
    };

    // Return JSX
    return (
        <div className={`create-account-container ${isArabic ? "rtl" : ""}`}>

            {/* Header with logo and language switch */}
            <header className="create-account-header">
                <h1 className="create-account-title1">
                    {isArabic ? "عَبِّرْ" : "Abber"}
                </h1>
                <button className="create-acc-language-switch" onClick={toggleLanguage}>
                    {isArabic ? "English" : "العربية"}
                </button>
            </header>       

            {/* Form title */}
            <h1 className="create-account-title">
                {isArabic 
                    ? "😊 أهلاً بك! لننشئ حسابك معًا "  
                    : "Let's Create Your Account Together 😊"}
            </h1>

            {/* Form wrapper */}
            <div className="form-wrapper">
                {/* Form for account creation */}
                <form className={`create-account-form ${isArabic ? "rtl" : ""}`} onSubmit={handleSubmit}>
                    {/* Username field */}
                    <label className="form-label">
                        {isArabic ? "اسم المستخدم" : "Username"}
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </label>

                    {/* Email field */}
                    <label className="form-label">
                        {isArabic ? "البريد الإلكتروني" : "Email"}
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </label>

                    {/* Password field */}
                    <label className="form-label">
                        {isArabic ? "كلمة المرور" : "Password"}
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </label>

                    {/* Confirm password field */}
                    <label className="form-label">
                        {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </label>

                    {/* Submit button */}
                    <button type="submit" className="create-account-button">
                        {isArabic ? "إنشاء الحساب" : "Create Account"}
                    </button>
                </form>

                {/* Link to login page */}
                <p className="already-account-text" onClick={() => navigate("/login")}>
                    {isArabic ? "هل لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Login"}
                </p>

                {/* Return to home button */}
                <button className="home-button primary" onClick={() => navigate("/")}>
                    {isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}
                </button>
            </div>
        </div>
    );
}

export default CreateAccount;
