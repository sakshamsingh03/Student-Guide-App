import { useState, useEffect } from "react";

export default function Profile() {
  const [user, setUser] = useState(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    return data || {};
  });

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [dob, setDob] = useState(user.dob || "");

  const handleSave = () => {
    const updatedUser = { ...user, name, dob };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-sky-200 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md text-center">
        <div className="text-7xl mb-4">👤</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile</h2>

        {editMode ? (
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 text-sm">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              onClick={handleSave}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Save Profile
            </button>
          </div>
        ) : (
          <div className="text-left space-y-3 text-gray-700">
            <div>
              <span className="font-semibold">Full Name:</span> {user.name || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Date of Birth:</span> {user.dob || "N/A"}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {user.email || "N/A"}
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
