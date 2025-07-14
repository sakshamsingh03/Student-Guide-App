import { useState, useEffect } from "react";

export default function Diary() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("diaryEntries");
    return saved ? JSON.parse(saved) : {};
  });
  const [currentDate, setCurrentDate] = useState(() =>
    new Date().toISOString().split("T")[0]
  );
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    setCurrentText(entries[currentDate] || "");
  }, [currentDate, entries]);

  const handleSave = () => {
    const updated = { ...entries, [currentDate]: currentText };
    setEntries(updated);
    localStorage.setItem("diaryEntries", JSON.stringify(updated));
  };

  const handleDelete = (date) => {
    const updated = { ...entries };
    delete updated[date];
    setEntries(updated);
    localStorage.setItem("diaryEntries", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white p-6">
      <h1 className="text-4xl font-bold text-sky-600 mb-6 text-center">📓 Your Diary</h1>

      <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <label className="font-semibold text-gray-700">Select Date:</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="border rounded px-3 py-2 focus:border-blue-400 focus:ring-blue-300 w-full sm:w-auto"
          />
        </div>

        <textarea
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
          placeholder="Write your thoughts here..."
          rows={8}
          className="w-full border rounded px-4 py-3 focus:border-black focus:ring-black resize-none mb-4"
        />

        <button
          onClick={handleSave}
          className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Save
        </button>
      </div>

      {Object.keys(entries).length > 0 && (
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📜 Previous Entries</h2>
          <ul className="space-y-4">
            {Object.entries(entries).map(([date, text]) => (
              <li key={date} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">{date}</span>
                  <button
                    onClick={() => handleDelete(date)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    ❌
                  </button>
                </div>
                <p className="whitespace-pre-wrap text-gray-800">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
