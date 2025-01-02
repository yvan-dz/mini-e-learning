import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <p>Lade...</p>; // Zeige einen Ladezustand, bis der Auth-Status geprüft ist.
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
