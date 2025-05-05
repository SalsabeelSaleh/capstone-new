// Define the backend API base URL — either from environment variable or fallback to local development server
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Register user
export const registerUser = async (userData) => {
    try {
        // Send POST request to /auth/register with user details
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Registration failed");
        }

        return data;
    } catch (error) {
        console.error("Registration error:", error);
        return { error: error.message };
    }
};

// Login user
export const loginUser = async (credentials) => {
    try {
        // Send POST request to /auth/login with username/password
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Login failed");
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        return { error: error.message };
    }
};

// Get user profile
export const getUserProfile = async (userId) => {
    try {
        // Send GET request to fetch user details by ID
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch profile");
        }

        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        throw error;
    }
};

// Update user profile
export const updateUserProfile = async (userId, updatedData) => {
    try {
        // Send PUT request to update user's profile by ID
        const response = await fetch(`${API_BASE_URL}/user/profile/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // Uses localStorage to fetch a token. removed unless JWT auth is used:
                // "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to update profile");
        }

        return data;
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: error.message };
    }
};

// Emotion detection
export const sendDetectionData = async (imageData) => {
    // POST base64 webcam image to the emotion detection endpoint
    const response = await fetch(`${API_BASE_URL}/detect-emotion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
    });

    return response.json();
};
