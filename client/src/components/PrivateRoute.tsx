import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

type Props = {
  children: JSX.Element;
  requiredRole?: "admin" | "user";
};

export default function PrivateRoute({ children, requiredRole }: Props) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
