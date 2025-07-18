import React from "react";
import useAuth from "../hooks/useAuth";
import ForbiddenPage from "../pages/ForbiddenPage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UnAuthorizePage from "../pages/UnAuthorizePage";
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!auth?.role) {
      navigate("/login", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth, navigate, location]);

  // Jika belum ada auth.role, render kosong agar tidak sempat render ForbiddenPage
  if (!auth?.role) {
    return null;
  }

  return (
    <>
      {allowedRoles.find((allow) => allow.includes(auth.role)) ? (
        <Outlet />
      ) : (
        <ForbiddenPage />
      )}
    </>
  );
};

export default RequireAuth;
