import { createContext } from "react";

export type Role = "admin" | "user";

export type AuthContextType = {
  isAuthenticated: boolean;
  role: Role | null;
  loading: boolean;
  login: (role: Role, token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
