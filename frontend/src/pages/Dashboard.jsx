export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email ? user.email.split("@")[0] : "Student";
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-blue-900">Welcome to your Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">✅ Tasks</h3>
          <p className="text-gray-600">Manage and track your to-do list.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📓 Diary</h3>
          <p className="text-gray-600">Write and review your daily thoughts.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">🗓️ Timetable</h3>
          <p className="text-gray-600">Plan your schedule efficiently.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📝 Notes</h3>
          <p className="text-gray-600">Organize your study notes.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">😊 Mood Tracker</h3>
          <p className="text-gray-600">Record how you feel each day.</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📚 Academic Resources</h3>
          <p className="text-gray-600">Access useful study materials.</p>
        </div>
      </div>
    </div>
  );
}

