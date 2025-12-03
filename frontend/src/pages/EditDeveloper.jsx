import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const API = "https://talrn-gl6q.onrender.com/api/developers";

export default function EditDeveloper() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const nav = useNavigate();

  const [form, setForm] = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setForm(res.data))
      .catch(() => toast.error("Failed to fetch developer"));
  }, []);

  if (!form)
    return (
      <div className="text-center p-6 dark:text-white">Loading...</div>
    );

  const updateHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Developer updated!");
      nav(`/developer/${id}`);
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteHandler = async () => {
    if (!confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted successfully");
      nav("/");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">

      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">

        {/* Back Button */}
        <button
          onClick={() => nav(-1)}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white 
                    rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold mb-4 dark:text-white">Edit Developer</h2>

        <form className="space-y-4" onSubmit={updateHandler}>

          <input
            className="p-3 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="p-3 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full-Stack</option>
          </select>

          <input
            className="p-3 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.techStack.join(", ")}
            onChange={(e) =>
              setForm({ ...form, techStack: e.target.value.split(",") })
            }
          />

          <input
            className="p-3 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.experience}
            type="number"
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />

          <textarea
            className="p-3 w-full border rounded h-24 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Update
            </button>

            <button
              type="button"
              onClick={deleteHandler}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
