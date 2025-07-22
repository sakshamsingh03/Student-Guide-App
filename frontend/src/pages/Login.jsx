import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-700 font-sans">
      <div className="flex max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Left Side - Welcome */}
        <div className="w-1/2 bg-gradient-to-br from-purple-900 to-blue-800 p-10 text-white flex flex-col justify-center relative">
          <h1 className="text-3xl font-extrabold mb-2">Student Guide</h1>
          <h2 className="text-2xl font-bold mb-4">Welcome Page</h2>
          <p className="text-md">Sign in to continue access</p>

          {/* Decorative bubbles */}
          <div className="absolute top-4 right-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-30 blur-2xl" />
          <div className="absolute bottom-8 left-10 w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full opacity-40 blur-2xl" />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition"
            >
              Continue →
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-purple-700 hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
