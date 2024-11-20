import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedUserType, allowed }) => {
  const token = localStorage.getItem("token");
  const userType = parseInt(localStorage.getItem("userType"));

  if (!token || userType !== allowedUserType) {
    return <Navigate to="./../pages/login.jsx" />;
  }

  return allowed;
};

export default ProtectedRoute;
