import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  // If user is already logged in → don't allow login/signup pages
  if (token) return <Navigate to="/" replace />;

  return children;
}
