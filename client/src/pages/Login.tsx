import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Guardar token y role
      login(data.role || "user", data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register"); // Navegar a la página de registro
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 rounded text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded font-semibold hover:bg-blue-700"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleRegisterRedirect}
          className="w-full mt-4 p-2 bg-gray-600 rounded text-white font-semibold hover:bg-gray-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
