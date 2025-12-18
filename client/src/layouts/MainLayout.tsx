import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          MyApp
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>

              {role === "admin" && (
                <>
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Admin Panel
                  </Link>

                  <Link
                    to="/admin/products"
                    className="px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Products
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                className="mt-auto px-4 py-2 rounded bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
