import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Timetable from "./pages/Timetable";
import Diary from "./pages/Diary";
import Notes from "./pages/Notes";
import MoodTracker from "./pages/MoodTracker";
import AcademicResources from "./pages/AcademicResources";
import Profile from "./pages/Profile";
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<TaskManager />} />
          <Route path="calendar" element={<Timetable />} />
          <Route path="diary" element={<Diary />} />
          <Route path="notes" element={<Notes />} />
          <Route path="mood" element={<MoodTracker />} />
          <Route path="resources" element={<AcademicResources />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
