import { useAuth } from "../../hooks/useAuth";

export default function AdminPanel() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <p className="mb-6">Welcome, admin! Here you can manage the system.</p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 rounded bg-red-600 hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
