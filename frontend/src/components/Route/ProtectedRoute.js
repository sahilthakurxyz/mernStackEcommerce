import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = ({ isAuthenticated, children, adminRoute, isAdmin }) => {
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }
  if (adminRoute && !isAdmin) {
    alert(
      "You're not Allowed for this Role & You Cannot Access Dashboard: For that Please Login As a Admin"
    );
    return <Navigate to="/account" />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
