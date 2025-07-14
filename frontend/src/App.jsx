import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './index.css';
import Timetable from "./pages/Timetable";
import Diary from "./pages/Diary";
import Notes from "./pages/Notes";



// import other pages...

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


          {/* Add more routes here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
