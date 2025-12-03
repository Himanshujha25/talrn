import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = "https://talrn-gl6q.onrender.com/api/developers";

export default function AddDeveloper() {
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    techStack: "",
    experience: "",
    description: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Developer added!");
      nav("/");
    } catch {
      toast.error("Failed to add developer");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">

        <h2 className="text-2xl font-bold mb-5 dark:text-white">Add Developer</h2>

        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            className="p-3 w-full border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="p-3 w-full border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full-Stack</option>
          </select>

          <input
            className="p-3 w-full border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Tech Stack (comma separated)"
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />

          <input
            className="p-3 w-full border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Experience (years)"
            type="number"
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />

          <textarea
            className="p-3 w-full border rounded bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 h-28"
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded"
          >
            Add Developer
          </button>
        </form>
      </div>
    </div>
  );
}
