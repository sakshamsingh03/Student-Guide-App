import { useState, useEffect } from "react";
import { useNotification } from "../Notification"; // ✅ Import

export default function Notes() {
  const { showNotification } = useNotification(); // ✅ Get showNotification

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [newNote, setNewNote] = useState("");
  const [textStyle, setTextStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
    fontSize: "16px",
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        text: newNote,
        style: { ...textStyle },
      },
    ]);
    showNotification("Note added successfully!"); // ✅ Notify
    setNewNote("");
    setTextStyle({
      bold: false,
      italic: false,
      underline: false,
      fontSize: "16px",
    });
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    showNotification("Note removed successfully!"); // ✅ Notify
  };

  const toggleStyle = (type) => {
    setTextStyle((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white p-6">
      <h1 className="text-4xl font-bold text-sky-600 mb-6 text-center">📝 Notes</h1>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-wrap justify-end gap-2 mb-4">
          <button
            onClick={() => toggleStyle("bold")}
            className={`px-2 py-1 border rounded ${textStyle.bold ? "bg-sky-300" : ""}`}
          >
            B
          </button>
          <button
            onClick={() => toggleStyle("italic")}
            className={`px-2 py-1 border rounded ${textStyle.italic ? "bg-sky-300" : ""}`}
          >
            I
          </button>
          <button
            onClick={() => toggleStyle("underline")}
            className={`px-2 py-1 border rounded ${textStyle.underline ? "bg-sky-300" : ""}`}
          >
            U
          </button>
          <select
            value={textStyle.fontSize}
            onChange={(e) =>
              setTextStyle((prev) => ({ ...prev, fontSize: e.target.value }))
            }
            className="border rounded px-2 py-1"
          >
            <option value="14px">Small</option>
            <option value="16px">Normal</option>
            <option value="20px">Large</option>
            <option value="24px">Extra Large</option>
          </select>
        </div>

        <textarea
          rows="4"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write your note..."
          className="w-full border rounded px-4 py-3 focus:outline-none focus:border-black focus:ring-black"
          style={{
            fontWeight: textStyle.bold ? "bold" : "normal",
            fontStyle: textStyle.italic ? "italic" : "normal",
            textDecoration: textStyle.underline ? "underline" : "none",
            fontSize: textStyle.fontSize,
          }}
        />

        <button
          onClick={handleAddNote}
          className="mt-4 bg-sky-400 text-white px-4 py-2 rounded hover:bg-sky-300 transition w-full"
        >
          ➕ Add Note
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {notes.length === 0 && (
          <p className="text-center text-gray-500 italic">No notes yet.</p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            className="rounded p-4 shadow hover:shadow-md transition relative bg-yellow-50 border"
          >
            <button
              onClick={() => handleDeleteNote(note.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete note"
            >
              ❌
            </button>
            <p
              className="whitespace-pre-wrap"
              style={{
                fontWeight: note.style.bold ? "bold" : "normal",
                fontStyle: note.style.italic ? "italic" : "normal",
                textDecoration: note.style.underline ? "underline" : "none",
                fontSize: note.style.fontSize,
              }}
            >
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
