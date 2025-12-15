import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import type { Role } from "./authContext";
import { getMe } from "../services/userService";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [role, setRole] = useState<Role | null>(() => {
    const r = localStorage.getItem("role");
    return r === "admin" || r === "user" ? (r as Role) : null;
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await getMe();
        setIsAuthenticated(true);
        setRole(user.role);
      } catch {
        setIsAuthenticated(false);
        setRole(null);
      }
    };

    loadUser();
  }, []);

  const login = (userRole: Role) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
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
