import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedUserType, children }) => {
  const token = localStorage.getItem("token");
  const userType = parseInt(localStorage.getItem("userType"));

  if (!token || userType !== allowedUserType) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
