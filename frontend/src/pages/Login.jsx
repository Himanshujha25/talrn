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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white dark:bg-gray-800 shadow rounded w-80"
      >
        <h2 className="text-xl mb-4 font-bold dark:text-white">Login</h2>

        <input
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          Login
        </button>

        <p
          className="mt-3 text-sm text-blue-600 cursor-pointer"
          onClick={() => nav("/signup")}
        >
          Create an account
        </p>
      </form>
    </div>
  );
}
