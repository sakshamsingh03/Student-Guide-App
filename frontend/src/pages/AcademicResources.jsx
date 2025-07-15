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
  const [uploadModal, setUploadModal] = useState({ visible: false, catKey: null });
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [newResource, setNewResource] = useState(
    CATEGORIES.reduce((acc, cat) => {
      acc[cat.key] = { title: "", description: "", link: "", file: null };
      return acc;
    }, {})
  );

  useEffect(() => {
    localStorage.setItem("academicResourcesV2", JSON.stringify(resources));
  }, [resources]);

  const getCategoryLabel = (catKey) => {
    const cat = CATEGORIES.find((c) => c.key === catKey);
    return cat?.label || catKey;
  };

  const handleChange = (catKey, field, value) => {
    setNewResource((prev) => ({
      ...prev,
      [catKey]: { ...prev[catKey], [field]: value },
    }));
  };

  const handleFileSelect = (file, catKey) => {
    setNewResource((prev) => ({
      ...prev,
      [catKey]: { ...prev[catKey], file },
    }));
    setUploadModal({ visible: false, catKey: null });
    setDragOver(false);
    setSelectedFile(null);
  };

  const handleDrop = (e, catKey) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file, catKey);
    }
  };

  const handleAdd = (catKey) => {
    const { title, link, description, file } = newResource[catKey];

    // NEW VALIDATION:
    // If no file: require title and link
    if (!file && (!title || !link)) {
      showNotification("Please provide either a file or both title and link.");
      return;
    }

    setResources((prev) => ({
      ...prev,
      [catKey]: [
        ...(prev[catKey] || []),
        {
          id: Date.now(),
          title: title || (file ? file.name : ""),  // Default to file name
          description: description || "",
          link: link || "",
          fileName: file ? file.name : null,
        },
      ],
    }));

    showNotification(`${getCategoryLabel(catKey)} - Resource added successfully!`);

    setNewResource((prev) => ({
      ...prev,
      [catKey]: { title: "", description: "", link: "", file: null },
    }));
  };

  const handleDelete = (catKey, id) => {
    setResources((prev) => ({
      ...prev,
      [catKey]: prev[catKey].filter((item) => item.id !== id),
    }));
    showNotification(`${getCategoryLabel(catKey)} removed successfully!`);
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
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    placeholder="Title (for links)"
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
                    placeholder="Link (optional)"
                    value={newResource[cat.key].link}
                    onChange={(e) => handleChange(cat.key, "link", e.target.value)}
                    className="w-full border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:ring-sky-500 focus:border-sky-500"
                  />

                  <button
                    type="button"
                    onClick={() => setUploadModal({ visible: true, catKey: cat.key })}
                    className="w-full bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
                  >
                    📁 Upload File
                  </button>

                  {newResource[cat.key].file && (
                    <p className="text-green-600 text-sm mt-1">
                      Selected file: {newResource[cat.key].file.name}
                    </p>
                  )}

                  <button
                    onClick={() => handleAdd(cat.key)}
                    className="w-full bg-sky-500 text-white font-semibold py-2 rounded-lg hover:bg-sky-600 transition"
                  >
                    ➕ Add Resource
                  </button>
                </div>

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
                          onClick={() => handleDelete(cat.key, item.id)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                          title="Delete resource"
                        >
                          ❌
                        </button>
                        <h3 className="text-lg font-semibold text-sky-700 mb-2">{item.title}</h3>
                        <p className="text-gray-700 mb-2 whitespace-pre-wrap">{item.description}</p>
                        {item.link && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-600 hover:underline break-words"
                          >
                            📎 {item.link}
                          </a>
                        )}
                        {item.fileName && (
                          <p className="text-gray-600 text-sm mt-2">📄 {item.fileName}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {uploadModal.visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => handleDrop(e, uploadModal.catKey)}
          >
            <h2 className="text-xl font-semibold mb-4">Upload File</h2>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center mb-4 ${
                dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
            >
              {dragOver ? "Release to upload" : "Drag file here"}
            </div>
            <input
              type="file"
              className="mb-4"
              onChange={(e) => {
                if (e.target.files[0]) {
                  handleFileSelect(e.target.files[0], uploadModal.catKey);
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setUploadModal({ visible: false, catKey: null })}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setUploadModal({ visible: false, catKey: null })}
                className="px-4 py-2 rounded bg-sky-500 text-white hover:bg-sky-600"
              >
                Next / Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
