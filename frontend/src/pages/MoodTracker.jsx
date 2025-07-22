import { useState, useEffect } from "react";
import { useNotification } from "../Notification";

export default function MoodTracker() {
  const { showNotification } = useNotification();

  const today = new Date();
  const todayISO = getISODate(today);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("moodEntries");
    return saved ? JSON.parse(saved) : {};
  });

  const [showForm, setShowForm] = useState(false);
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(entries));
  }, [entries]);

  function getISODate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getMonthDays(year, month) {
    const last = new Date(year, month + 1, 0);
    const days = [];
    for (let d = 1; d <= last.getDate(); d++) {
      days.push(new Date(year, month, d));
    }
    return days;
  }

  const handleSave = () => {
    if (!mood) return;
    setEntries({ ...entries, [todayISO]: { mood, note } });
    showNotification("Mood saved successfully!");
    setShowForm(false);
    setMood("");
    setNote("");
  };

  const handleRemove = () => {
    const updated = { ...entries };
    delete updated[todayISO];
    setEntries(updated);
    showNotification("Mood deleted successfully!");
    setShowForm(false);
    setMood("");
    setNote("");
  };

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long",
  });

  const monthDays = getMonthDays(viewYear, viewMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4">
      <h1 className="text-3xl sm:text-4xl text-center font-bold text-sky-600 mb-6">
        😊 Mood Tracker
      </h1>

      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <button
            onClick={goPrevMonth}
            className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
          >
            ← Prev
          </button>
          <h2 className="text-2xl sm:text-3xl font-semibold text-sky-500 text-center">
            {monthName} {viewYear}
          </h2>
          <button
            onClick={goNextMonth}
            className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
          >
            Next →
          </button>
        </div>

        <div className="overflow-auto max-h-[75vh]">
          <div
            className="
              grid grid-cols-7
              gap-2 sm:gap-3
              auto-rows-[minmax(80px,1fr)]
              md:auto-rows-[minmax(100px,1fr)]
            "
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-600"
              >
                {day}
              </div>
            ))}

            {Array(new Date(viewYear, viewMonth, 1).getDay())
              .fill("")
              .map((_, i) => <div key={`empty-${i}`} />)}

            {monthDays.map((dateObj) => {
              const dateStr = getISODate(dateObj);
              const isToday = dateStr === todayISO;
              const entry = entries[dateStr];

              return (
                <div
                  key={dateStr}
                  onClick={() => {
                    if (isToday) {
                      setMood(entry ? entry.mood : "");
                      setNote(entry ? entry.note : "");
                      setShowForm(true);
                    }
                  }}
                  className={`border rounded-lg p-2 cursor-pointer transition
                    ${isToday ? "border-sky-500 shadow-md" : "border-gray-300"}
                    bg-white hover:bg-sky-50 flex flex-col text-sm sm:text-base`}
                >
                  <div className="font-medium text-gray-700">
                    {dateObj.getDate()}
                  </div>
                  {entry && (
                    <div className="mt-1 text-center text-xl">
                      {entry.mood}
                      <p className="text-xs mt-1 text-gray-600 break-words">
                        {entry.note}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mood Input Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-sky-600 text-center">
              Mood for{" "}
              {new Date(todayISO).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>

            <div className="flex justify-around mb-4 text-3xl sm:text-4xl">
              <button
                onClick={() => setMood("🙂")}
                className={`${mood === "🙂" ? "bg-yellow-200 rounded" : ""}`}
              >
                🙂 
              </button>
              <button
                onClick={() => setMood("😐")}
                className={`${mood === "😐" ? "bg-gray-200 rounded" : ""}`}
              >
                😐
              </button>
              <button
                onClick={() => setMood("🙁")}
                className={`${mood === "🙁" ? "bg-blue-200 rounded" : ""}`}
              >
                🙁
              </button>
            </div>

            <textarea
              placeholder="Write something about today..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-sky-300 text-sm sm:text-base"
            />

            <div className="flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
              >
                Save
              </button>
              <button
                onClick={handleRemove}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
