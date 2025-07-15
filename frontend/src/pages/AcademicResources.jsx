import { useState, useEffect } from "react";
import { useNotification } from "../Notification";

const CATEGORIES = [
  { key: "notes", label: "📑 Notes" },
  { key: "books", label: "📘 Books" },
  { key: "pastPapers", label: "📝 Previous Year Papers" },
  { key: "videos", label: "🎥 Lecture Videos" },
  { key: "assignments", label: "📂 Assignments" },
  { key: "revision", label: "🎯 Revision Tools" },
];

export default function AcademicResources() {
  const { showNotification } = useNotification();

  const [resources, setResources] = useState(() => {
    const saved = localStorage.getItem("academicResourcesV2");
    return saved ? JSON.parse(saved) : {};
  });

  const [expanded, setExpanded] = useState({});

  const [newResource, setNewResource] = useState(
    CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] = { title: "", description: "", link: "" };
      return acc;
    }, {})
  );

  useEffect(() => {
    localStorage.setItem("academicResourcesV2", JSON.stringify(resources));
  }, [resources]);

  const handleChange = (catKey, field, value) => {
    setNewResource((prev) => ({
      ...prev,
      [catKey]: { ...prev[catKey], [field]: value },
    }));
  };

  const handleAdd = (catKey) => {
    const { title, link, description } = newResource[catKey];
    if (!title || !link) return;

    setResources((prev) => ({
      ...prev,
      [catKey]: [
        ...(prev[catKey] || []),
        { id: Date.now(), title, description, link },
      ],
    }));

    showNotification(`${title} added successfully!`);

    setNewResource((prev) => ({
      ...prev,
      [catKey]: { title: "", description: "", link: "" },
    }));
  };

  const handleDelete = (catKey, id, title) => {
    setResources((prev) => ({
      ...prev,
      [catKey]: prev[catKey].filter((item) => item.id !== id),
    }));

    showNotification(`${title} removed successfully!`);
  };

  const toggleExpand = (catKey) => {
    setExpanded((prev) => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <h1 className="text-4xl font-bold text-sky-700 mb-8 text-center">
        📚 Academic Resources
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="bg-white rounded-lg shadow-lg">
            <button
              onClick={() => toggleExpand(cat.key)}
              className="w-full flex justify-between items-center px-6 py-4 bg-sky-400 text-white rounded-t-lg hover:bg-sky-500 transition"
            >
              <span className="text-lg font-semibold">{cat.label}</span>
              <span>{expanded[cat.key] ? "▲" : "▼"}</span>
            </button>

            {expanded[cat.key] && (
              <div className="p-6 border-t">
                {/* Add Form */}
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newResource[cat.key].title}
                    onChange={(e) => handleChange(cat.key, "title", e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  />
                  <textarea
                    placeholder="Description"
                    value={newResource[cat.key].description}
                    onChange={(e) => handleChange(cat.key, "description", e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  />
                  <input
                    type="url"
                    placeholder="Link"
                    value={newResource[cat.key].link}
                    onChange={(e) => handleChange(cat.key, "link", e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  />
                  <button
                    onClick={() => handleAdd(cat.key)}
                    className="w-full bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
                  >
                    ➕ Add Resource
                  </button>
                </div>

                {/* Resource List */}
                {(resources[cat.key]?.length || 0) === 0 ? (
                  <p className="text-gray-500 italic">No resources added yet.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {resources[cat.key].map((item) => (
                      <div
                        key={item.id}
                        className="bg-green-50 border border-green-200 rounded-lg p-4 relative shadow hover:shadow-md transition"
                      >
                        <button
                          onClick={() => handleDelete(cat.key, item.id, item.title)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          title="Delete resource"
                        >
                          ❌
                        </button>
                        <h3 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-2 whitespace-pre-wrap">{item.description}</p>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-600 hover:underline break-words"
                        >
                          📎 {item.link}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
