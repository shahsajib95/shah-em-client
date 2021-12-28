import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loading />;
  return user.email ? (
    children
  ) : (
    <Navigate to="/register" state={{ from: location }} />
  );
}
