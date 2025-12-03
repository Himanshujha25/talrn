import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = "https://talrn-gl6q.onrender.com/api/auth/signup";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API, form);
      toast.success("Signup successful!");
      nav("/login");
    } catch {
      toast.error("Email already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">

        <h1 className="text-2xl font-extrabold text-center mb-6 dark:text-white">
          Developer Directory
        </h1>

        <h2 className="text-xl mb-4 font-semibold dark:text-gray-200">
          Create Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">

          <input
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 
                       dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 
                       dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            className="w-full p-3 border rounded bg-gray-50 dark:bg-gray-700 
                       dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full p-3 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Sign Up
          </button>
        </form>

        <p
          className="mt-4 text-sm text-blue-600 dark:text-blue-400 cursor-pointer text-center"
          onClick={() => nav("/login")}
        >
          Already have an account?
        </p>

      </div>
    </div>
  );
}
