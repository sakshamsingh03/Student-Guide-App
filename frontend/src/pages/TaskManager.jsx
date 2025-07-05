import { useState } from "react";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
  });

  const handleAddTask = () => {
    if (!newTask.title) return;
    setTasks([
      ...tasks,
      { ...newTask, id: Date.now() }
    ]);
    setNewTask({ title: "", dueDate: "", priority: "Medium" });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">🎯 Task Manager</h1>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Task</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={newTask.title}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
          >
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
          <button
            onClick={handleAddTask}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ➕ Add Task
          </button>
        </div>
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Task List</h2>
        {tasks.length === 0 && (
          <p className="text-gray-500 italic">No tasks added yet.</p>
        )}
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border rounded-lg px-4 py-3 bg-gray-50 shadow-sm hover:bg-gray-100 transition"
            >
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                <p className="text-sm text-gray-600">
                  Due: {task.dueDate || "No date"}
                </p>
                <span
                  className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${
                    task.priority === "High"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority} Priority
                </span>
              </div>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700 font-bold"
                title="Delete task"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
