import { useState, useEffect } from "react";
import { useNotification } from "../Notification";

export default function TaskManager() {
  const { showNotification } = useNotification();

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState({
    text: "",
    dueDate: "",
    important: false,
  });
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.text.trim() !== "") {
      const addedTask = {
        ...newTask,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks([...tasks, addedTask]);
      setNewTask({ text: "", dueDate: "", important: false });
      showNotification(`Task '${addedTask.text}' added successfully!`);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleToggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    if (taskToDelete) {
      showNotification(`Task '${taskToDelete.text}' deleted successfully!`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const filteredTasks = showImportantOnly
    ? tasks.filter((task) => task.important)
    : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <h1 className="text-4xl font-bold mb-6 text-sky-700 text-center">
        ✅ Task Manager
      </h1>

      <div className="max-w-2xl mx-auto bg-white shadow-lg p-6 rounded mb-8">
        <div className="bg-gray-50 p-4 rounded mb-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-3">Add New Task</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="text"
              value={newTask.text}
              onChange={handleInputChange}
              placeholder="Task title"
              className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <input
              type="date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-400"
            />
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="important"
                checked={newTask.important}
                onChange={handleInputChange}
                className="accent-blue-600"
              />
              <span className="text-sm">Mark as Important</span>
            </label>
            <button
              onClick={handleAddTask}
              className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              ➕ Add Task
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Your Tasks</h3>
          <button
            onClick={() => setShowImportantOnly(!showImportantOnly)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showImportantOnly ? "Show All" : "Show Only Important"}
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 italic">No tasks to show.</p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((task) => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center border rounded px-4 py-3 shadow-sm ${
                    task.completed ? "bg-green-50 line-through" : "bg-white"
                  }`}
                >
                  <div className="flex-1">
                    <h4
                      className="font-medium text-lg cursor-pointer"
                      onClick={() => handleToggleComplete(task.id)}
                    >
                      {task.text}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Due: {task.dueDate || "No date"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </p>
                    <div className="mt-1 space-x-2">
                      {task.important && (
                        <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                          Important
                        </span>
                      )}
                      {task.completed && (
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleImportant(task.id)}
                      className="text-yellow-500 hover:text-yellow-700"
                      title="Toggle Important"
                    >
                      ⭐
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Task"
                    >
                      ❌
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
