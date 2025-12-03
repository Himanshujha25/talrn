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
    } catch (err) {
      toast.error("Email already exists");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={submitHandler}
        className="p-6 w-80 bg-white dark:bg-gray-800 shadow rounded"
      >
        <h2 className="text-xl mb-4 font-bold dark:text-white">Create Account</h2>

        <input
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full p-2 bg-blue-600 text-white rounded">
          Sign Up
        </button>

        <p
          onClick={() => nav("/login")}
          className="mt-3 text-sm text-blue-600 cursor-pointer"
        >
          Already have an account?
        </p>
      </form>
    </div>
  );
}
