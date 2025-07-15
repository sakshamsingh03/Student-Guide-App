import { useState, useEffect } from "react";

export default function MoodTracker() {
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
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
    setEntries({
      ...entries,
      [todayISO]: { mood, note }
    });
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

  const monthName = new Date(viewYear, viewMonth).toLocaleString('default', { month: 'long' });
  const monthDays = getMonthDays(viewYear, viewMonth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4">
      <h1 className="text-4xl text-center font-bold text-sky-600 mb-4">😊 Mood Tracker</h1>

      <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goPrevMonth}
            className="px-3 py-1 rounded bg-sky-400 text-white hover:bg-sky-500"
          >
            ← Prev
          </button>
          <h2 className="text-3xl font-bold text-sky-500">
            {monthName} {viewYear}
          </h2>
          <button
            onClick={goNextMonth}
            className="px-3 py-1 rounded bg-sky-400 text-white hover:bg-sky-500"
          >
            Next →
          </button>
        </div>

        <div
          className="
            grid grid-cols-7
            gap-2 sm:gap-3
            auto-rows-[minmax(80px,1fr)]
            md:auto-rows-[minmax(100px,1fr)]
            max-h-[70vh]
          "
        >
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-600 ">
              {day}
            </div>
          ))}

          {Array(new Date(viewYear, viewMonth, 1).getDay())
            .fill("")
            .map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

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
                className={`
                  border rounded-lg p-2 cursor-pointer transition
                  ${isToday ? "border-sky-500 shadow-lg" : "border-gray-300"}
                  bg-white hover:bg-sky-50 flex flex-col
                `}
              >
                <div className="text-sm font-medium text-gray-700">{dateObj.getDate()}</div>
                {entry && (
                  <div className="mt-2 text-center text-xl">
                    {entry.mood}
                    <p className="text-xs mt-1 break-words text-gray-700">{entry.note}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-sky-600">
              Mood for {new Date(todayISO).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>

            <div className="flex justify-around mb-4">
              <button
                onClick={() => setMood("🙂")}
                className={`text-4xl ${mood === "🙂" ? "bg-yellow-200 rounded" : ""}`}
              >
                🙂 
              </button>
              <button
                onClick={() => setMood("😐")}
                className={`text-4xl ${mood === "😐" ? "bg-gray-200 rounded" : ""}`}
              >
                😐
              </button>
              <button
                onClick={() => setMood("🙁")}
                className={`text-4xl ${mood === "🙁" ? "bg-blue-200 rounded" : ""}`}
              >
                🙁
              </button>
            </div>

            <textarea
              placeholder="Write something about today..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring-sky-300"
            />

            <div className="flex justify-end gap-2 flex-wrap">
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
                onClick={() => {
                  const updated = { ...entries };
                  delete updated[todayISO];
                  setEntries(updated);
                  setShowForm(false);
                  setMood("");
                  setNote("");
                }}
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
