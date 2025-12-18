import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { AuthContext, type Role } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // ✅ Estado de carga

  useEffect(() => {
    const loadAuth = () => {
      const token = localStorage.getItem("token");
      const r = localStorage.getItem("role");

      return {
        isAuthenticated: !!token,
        role: token && (r === "admin" || r === "user") ? (r as Role) : null,
      };
    };

    // 🔹 Actualizamos el estado de forma diferida
    const timer = setTimeout(() => {
      const auth = loadAuth();
      setIsAuthenticated(auth.isAuthenticated);
      setRole(auth.role);
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const login = (userRole: Role, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
