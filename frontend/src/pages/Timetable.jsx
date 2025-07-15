import { useState, useEffect } from "react";
import { useNotification } from "../Notification"; 

export default function Timetable() {
  const { showNotification } = useNotification();

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("timetable");
    return saved ? JSON.parse(saved) : {};
  });

  const [form, setForm] = useState({
    day: "Monday",
    time: "",
    subject: "",
  });

  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(timetable));
  }, [timetable]);

  const handleAdd = () => {
    if (!form.day || !form.time || !form.subject) return;
    setTimetable((prev) => {
      const dayData = prev[form.day] || [];
      return {
        ...prev,
        [form.day]: [...dayData, { time: form.time, subject: form.subject }],
      };
    });
    showNotification(`${form.day} entry added successfully!`); 
    setForm({ day: "Monday", time: "", subject: "" });
  };

  const handleDelete = (day, index) => {
    setTimetable((prev) => {
      const updated = [...prev[day]];
      updated.splice(index, 1);
      return { ...prev, [day]: updated };
    });
    showNotification(`Entry deleted successfully!`); 
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-sky-500 mb-6">📅 Timetable</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Add/Update Class</h2>
        <div className="flex flex-wrap gap-4">
          <select
            className="border px-3 py-2 rounded"
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <input
            type="time"
            className="border px-3 py-2 rounded"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            placeholder="Time"
          />
          <input
            type="text"
            className="border px-3 py-2 rounded"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Subject"
          />
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>

      {days.map((day) => (
        <div key={day} className="mb-4">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">{day}</h3>
          <ul className="bg-white p-4 rounded shadow space-y-2">
            {(timetable[day] || []).map((entry, index) => (
              <li
                key={index}
                className="flex justify-between items-center border px-3 py-2 rounded"
              >
                <span>{entry.time} — {entry.subject}</span>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(day, index)}
                >
                  ✖
                </button>
              </li>
            ))}
            {(timetable[day] || []).length === 0 && (
              <li className="text-gray-400 italic">No classes added</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
