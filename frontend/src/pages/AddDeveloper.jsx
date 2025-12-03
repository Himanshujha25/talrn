import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API = "https://https://talrn-gl6q.onrender.com/api/developers";

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

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("techStack", form.techStack);
    fd.append("experience", form.experience);
    fd.append("description", form.description);
    if (photo) fd.append("photo", photo);

    try {
      await axios.post(API, fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Developer added!");
      nav("/");
    } catch {
      toast.error("Failed to add developer");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700">

        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Add Developer
        </h2>

        {/* IMAGE PREVIEW */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                No Image
              </div>
            )}
          </div>

          <label className="mt-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            Upload Photo
            <input type="file" className="hidden" onChange={handleImage} />
          </label>
        </div>

        <form className="space-y-4" onSubmit={submitHandler}>
          <input
            className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full-Stack</option>
          </select>

          <input
            className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Tech Stack (comma separated)"
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />

          <input
            className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
            placeholder="Experience (years)"
            type="number"
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
          />

          <textarea
            className="p-3 w-full border rounded-lg bg-gray-50 dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600 h-28"
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold shadow"
          >
            Add Developer
          </button>
        </form>
      </div>
    </div>
  );
}
