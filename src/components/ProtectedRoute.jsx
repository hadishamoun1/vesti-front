import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem("jwtToken");

  if (!token) {
    return <Navigate to="/" replace />; 
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;

   
    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />; 
    }

    
    return children;
  } catch (error) {
    console.error("Error decoding token", error);
    return <Navigate to="/" replace />; 
  }
};

export default ProtectedRoute;
