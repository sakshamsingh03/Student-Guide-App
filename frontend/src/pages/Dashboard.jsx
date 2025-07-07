export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email ? user.email.split("@")[0] : "Student";

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome, {username} 👋</h1>
      <p className="text-gray-600 mb-6">Here’s a quick summary of your day:</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">📝 Tasks</h2>
          <p>3 pending tasks today</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">📓 Diary</h2>
          <p>You haven’t written today’s entry.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">😊 Mood</h2>
          <p>Yesterday’s mood: Happy</p>
        </div>
      </div>
    </div>
  );
}
