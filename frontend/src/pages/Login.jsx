import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = "https://talrn-gl6q.onrender.com/api/auth/login";

export default function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(API, { email, password });
      login(data.token);
      toast.success("Logged in!");
      nav("/");
    } catch {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-extrabold text-center mb-6 dark:text-white">
          Developer Directory
        </h1>

        <h2 className="text-xl mb-4 font-semibold dark:text-gray-200">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 
                       dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 
                       dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Login
          </button>
        </form>

        <p
          className="mt-4 text-sm text-blue-600 cursor-pointer text-center dark:text-blue-400"
          onClick={() => nav("/signup")}
        >
          Create an account
        </p>

      </div>
    </div>
  );
}
