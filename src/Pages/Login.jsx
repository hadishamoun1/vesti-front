import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;

        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // Store the token in session storage
        sessionStorage.setItem("jwtToken", token);

        // Redirect based on user role
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Welcome back!</h2>
          <p className="login-subtitle">Please login to your account.</p>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <div className="submit-btn-container">
              <button className="submit-btn" type="submit">
                Login
              </button>
            </div>
          </div>
          <div className="signup-link">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
