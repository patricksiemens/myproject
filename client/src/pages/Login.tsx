import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Submitting login:", { email, password }); // 🔹 agrega este log

    try {
      const data = await loginRequest(email, password);
      console.log("Login response:", data); // 🔹 agrega este log

      localStorage.setItem("access_token", data.access_token);

      login(data.role); // lo devuelve el backend
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err); // 🔹 agrega este log

      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-md w-80 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white outline-none"
          required
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        {/* Botón para ir a la pantalla de registro */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="w-full bg-gray-600 py-2 rounded hover:bg-gray-700 transition mt-2"
        >
          Register
        </button>
      </form>
    </div>
  );
}
