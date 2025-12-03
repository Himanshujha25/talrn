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
    description: ""
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Developer added!");
      nav("/");
    } catch {
      toast.error("Failed to add developer");
    }
  };

  return (
    <div className="p-6 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Add Developer</h2>

      <form className="space-y-3" onSubmit={submitHandler}>
        <input
          className="p-2 w-full border rounded dark:bg-gray-800"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="p-2 w-full border rounded dark:bg-gray-800"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full-Stack</option>
        </select>

        <input
          className="p-2 w-full border rounded dark:bg-gray-800"
          placeholder="Tech Stack (comma separated)"
          onChange={(e) => setForm({ ...form, techStack: e.target.value })}
        />

        <input
          className="p-2 w-full border rounded dark:bg-gray-800"
          placeholder="Experience (years)"
          type="number"
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
        />

        <textarea
          className="p-2 w-full border rounded dark:bg-gray-800"
          placeholder="Description"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
}
