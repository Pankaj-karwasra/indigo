// src/utils/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // 🧩 Invalid or missing token?
  const invalidToken =
    !token ||
    token === "null" ||
    token === "undefined" ||
    (typeof token === "string" && token.trim() === "");

  if (invalidToken) {
    // 🔒 Redirect to login and remember the page they tried to access
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 🧩 Admin route check
  if (adminOnly && (!user || user.role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
