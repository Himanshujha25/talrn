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
      <div className="p-6 dark:text-white text-center">
        Loading...
      </div>
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
    if (!confirm("Are you sure you want to delete this developer?")) return;

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
    <div className="p-6 dark:text-white w-full max-w-xl mx-auto">

      {/* Back Button */}
      <button
        onClick={() => nav(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white 
                  rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Edit Developer</h2>

      <form className="space-y-4" onSubmit={updateHandler}>

        <input
          className="p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700"
          value={form.name}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <select
          className="p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full-Stack</option>
        </select>

        <input
          className="p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700"
          value={form.techStack.join(", ")}
          placeholder="Tech stack (comma separated)"
          onChange={(e) =>
            setForm({ ...form, techStack: e.target.value.split(",") })
          }
        />

        <input
          className="p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700"
          value={form.experience}
          type="number"
          placeholder="Experience (years)"
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <textarea
          className="p-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700 h-28"
          value={form.description}
          placeholder="Description / About"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="flex gap-3 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update
          </button>

          <button
            type="button"
            onClick={deleteHandler}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
