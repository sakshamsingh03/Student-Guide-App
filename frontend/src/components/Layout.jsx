import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className="flex h-screen overflow-hidden">
      <aside className="w-76 bg-violet-500 text-white p-5 space-y-8 h-screen overflow-y-auto">
        <h1 className="text-4xl font-bold mb-6">Student Guide</h1>
        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" className="block hover:bg-sky-400 rounded px-4 py-3">
            🏠 Dashboard
          </Link>
          <Link to="/tasks" className="block hover:bg-sky-400 rounded px-4 py-3">
            ✅ Tasks
          </Link>
          <Link to="/diary" className="block hover:bg-sky-400 rounded px-4 py-3">
            📓 Diary
          </Link>
          <Link to="/calendar" className="block hover:bg-sky-400 rounded px-4 py-3">
            🗓️ Timetable
          </Link>
          <Link to="/notes" className="block hover:bg-sky-400 rounded px-4 py-3">
            📝 Notes
          </Link>
          <Link to="/mood" className="block hover:bg-sky-400 rounded px-4 py-3">
            😊 Mood Tracker
          </Link>
          <Link to="/resources" className="block hover:bg-sky-400 rounded px-4 py-3">
            📚 Academic Resources
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className=" mt-8 bg-sky-500 text-white rounded px-4 py-2 hover:bg-sky-700 transition"
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto h-screen">
        <Outlet />
      </main>
    </div>
  );
}