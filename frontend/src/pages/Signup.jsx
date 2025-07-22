import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() && dob && email.trim() && password.trim()) {
      const user = {
        name: name.trim(),
        dob,
        email: email.trim(),
        password: password.trim(), 
      };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-700 font-sans">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        
        <div className="md:w-1/2 bg-gradient-to-br from-purple-900 to-blue-800 p-8 sm:p-10 text-white flex flex-col justify-center relative">
          <h1 className="text-4xl font-extrabold mb-2">Student Guide</h1>
          <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
          <p className="text-md">Start organizing your student life today!</p>

          <div className="absolute top-4 right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30 blur-2xl" />
          <div className="absolute bottom-8 left-10 w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full opacity-40 blur-2xl" />
        </div>

        <div className="md:w-1/2 p-6 sm:p-10 bg-white">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
