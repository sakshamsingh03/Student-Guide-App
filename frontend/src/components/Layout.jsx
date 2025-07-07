import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Redirect to /login if not logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate, location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-5 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Student Guide</h1>
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="hover:underline">🏠 Dashboard</Link>
          <Link to="/tasks" className="hover:underline">✅ Tasks</Link>
          <Link to="/diary" className="hover:underline">📓 Diary</Link>
          <Link to="/calendar" className="hover:underline">🗓️ Timetable</Link>
          <Link to="/notes" className="hover:underline">📝 Notes</Link>
          <Link to="/mood" className="hover:underline">😊 Mood Tracker</Link>
          <Link to="/resources" className="hover:underline">📚 Academic Resources</Link>
          <Link to="/settings" className="hover:underline">⚙️ Settings</Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
