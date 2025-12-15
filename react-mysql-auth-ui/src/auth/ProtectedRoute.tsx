import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
