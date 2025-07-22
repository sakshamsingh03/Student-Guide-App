export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.email ? user.email.split("@")[0] : "Student";

  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const diaryEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
  const timetable = JSON.parse(localStorage.getItem("timetable")) || [];
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const moodEntries = JSON.parse(localStorage.getItem("moodEntries")) || {};
  const academicResources = JSON.parse(localStorage.getItem("academicResourcesV2")) || {};

  const academicResourceCount = Object.values(academicResources).reduce(
    (acc, arr) => acc + (arr?.length || 0), 0
  );

  const todayISO = new Date().toISOString().split("T")[0];
  const todayMood = moodEntries[todayISO]?.mood || "No mood recorded";

  const diaryCount = diaryEntries.length;
  const lastDiaryDate = diaryEntries.length
    ? diaryEntries.map(e => e.date).sort().reverse()[0]
    : null;

  const timetableCount = timetable.length;
  const notesCount = notes.length;
  const pendingTasks = allTasks.filter(task => !task.completed);
  const pendingTaskCount = pendingTasks.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-sky-700">
        📊 Dashboard Summary
      </h2>
      <p className="text-gray-600 mb-8 text-sm sm:text-base">
        Quick stats and tools for <strong>{username}</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* ✅ Tasks */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">✅ Tasks</h3>
          <p className="text-gray-600">
            {pendingTaskCount > 0
              ? `${pendingTaskCount} task${pendingTaskCount !== 1 ? "s" : ""} pending.`
              : "No pending tasks."}
          </p>
        </div>

        {/* ✅ Diary */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">📓 Diary</h3>
          {diaryCount > 0 ? (
            <p className="text-gray-600">
              You have {diaryCount} entr{diaryCount !== 1 ? "ies" : "y"}.<br />
              Last entry on <strong>{lastDiaryDate}</strong>.
            </p>
          ) : (
            <p className="text-gray-600">No entries yet.</p>
          )}
        </div>

        {/* ✅ Timetable */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">🗓️ Timetable</h3>
          <p className="text-gray-600">
            {timetableCount > 0
              ? `${timetableCount} classes scheduled.`
              : "No classes yet."}
          </p>
        </div>

        {/* ✅ Notes */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">📝 Notes</h3>
          <p className="text-gray-600">
            {notesCount} note{notesCount !== 1 ? "s" : ""} created.
          </p>
        </div>

        {/* ✅ Mood Tracker */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">😊 Mood Tracker</h3>
          <p className="text-gray-600">Today’s mood: {todayMood}</p>
        </div>

        {/* ✅ Academic Resources */}
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300">
          <h3 className="text-xl font-semibold mb-2">📚 Academic Resources</h3>
          <p className="text-gray-600">
            {academicResourceCount} resource{academicResourceCount !== 1 ? "s" : ""} added.
          </p>
        </div>
      </div>
    </div>
  );
}
