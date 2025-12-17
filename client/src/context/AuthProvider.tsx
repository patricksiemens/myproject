import type { ReactNode } from "react";
import { useState } from "react";
import { AuthContext, type Role } from "./authContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("token") !== null;
  });

  const [role, setRole] = useState<Role | null>(() => {
    const r = localStorage.getItem("role");
    return r === "admin" || r === "user" ? (r as Role) : null;
  });

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
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
