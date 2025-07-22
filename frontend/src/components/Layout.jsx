import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className={`fixed md:static top-0 left-0 z-50 h-full bg-violet-500 text-white w-64 p-5 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <IoClose size={24} />
          </button>
        </div>

        <h1 className="text-3xl font-bold mb-6">Student Guide</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            🏠 Dashboard
          </Link>
          <Link to="/tasks" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            ✅ Tasks
          </Link>
          <Link to="/diary" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            📓 Diary
          </Link>
          <Link to="/calendar" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            🗓️ Timetable
          </Link>
          <Link to="/notes" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            📝 Notes
          </Link>
          <Link to="/mood" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            😊 Mood Tracker
          </Link>
          <Link to="/resources" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            📚 Academic Resources
          </Link>
          <Link to="/profile" onClick={() => setIsSidebarOpen(false)} className="block hover:bg-sky-400 rounded px-4 py-3">
            👤 Profile
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 bg-sky-500 text-white rounded px-4 py-2 hover:bg-sky-700 transition"
        >
          Logout
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
    
        <div className="md:hidden flex items-center justify-between bg-white shadow p-4">
          <button onClick={() => setIsSidebarOpen(true)}>
            <FaBars size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-700">Student Guide</h1>
        </div>

        <main className="flex-1 bg-gray-50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
