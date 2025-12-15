import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";
import type { Role } from "../context/authContext.tsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (userRole: Role) => {
    login(userRole);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white gap-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <button
        onClick={() => handleLogin("admin")}
        className="bg-blue-600 px-6 py-2 rounded"
      >
        Login as Admin
      </button>

      <button
        onClick={() => handleLogin("user")}
        className="bg-green-600 px-6 py-2 rounded"
      >
        Login as User
      </button>
    </div>
  );
}
