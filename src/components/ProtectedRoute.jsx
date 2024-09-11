import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // Get the token from sessionStorage
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/" replace />;
  }

  try {
    // Decode the token
    const decodedToken = jwtDecode(token);

    // Extract the role from the decoded token
    const userRole = decodedToken.role;

    // Check if the user role is allowed to access the route
    if (!allowedRoles.includes(userRole)) {
      // If not allowed, redirect to the login page (or another page)
      return <Navigate to="/" replace />;
    }

    // If the role is allowed, render the child component
    return children;
  } catch (error) {
    // Handle token decoding error (e.g., token is invalid or expired)
    console.error("Error decoding token", error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
