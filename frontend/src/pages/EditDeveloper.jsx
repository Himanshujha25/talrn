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
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch developer data on mount
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setForm(res.data);
        const fullImage = res.data.photo ? `https://talrn-gl6q.onrender.com${res.data.photo}` : "";
        setPreview(fullImage);
      })
      .catch(() => toast.error("Failed to fetch developer details."))
      .finally(() => setIsLoading(false));
  }, [id, token]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value.trim();
    const techStackArray = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
      
    setForm((prevForm) => ({ ...prevForm, techStack: techStackArray }));
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    if (!form) return;

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("role", form.role);
    fd.append("techStack", form.techStack.join(","));
    fd.append("experience", form.experience);
    fd.append("description", form.description);
    if (photo) fd.append("photo", photo);

    try {
      await axios.put(`${API}/${id}`, fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Profile updated!");
      nav(`/developer/${id}`);
    } catch (error) {
      toast.error("❌ Update failed.");
    }
  };

  const deleteHandler = async () => {
    if (!confirm(`Are you sure you want to delete ${form?.name}?`)) return;

    try {
      await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("🗑️ Profile deleted!");
      nav("/");
    } catch (error) {
      toast.error("❌ Delete failed.");
    }
  };

  // --- Render Loading/Error States ---
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl font-medium dark:text-white">Loading...</div>
      </div>
    );

  if (!form)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-xl font-medium text-red-500">Error: Not found.</div>
      </div>
    );

  // --- Render Edit Form ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center py-8 px-4">
      
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700 h-fit max-h-[90vh] overflow-y-auto">
      
        {/* Header and Back Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => nav(-1)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm font-medium"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Edit Profile
          </h2>
        </div>

        <hr className="mb-6 border-gray-100 dark:border-gray-700" />
        
        {/* Image Upload Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 shadow-md">
            {preview ? (
              <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center text-gray-500 dark:text-gray-400 text-xs">
                No Photo
              </div>
            )}
          </div>

          <label className="mt-3 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 text-sm rounded-full transition font-medium shadow-sm">
            Change Photo
            <input type="file" className="hidden" onChange={handleImage} accept="image/*" />
          </label>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={updateHandler}>
          
          {/* Name */}
          <input
            name="name"
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />

          {/* Role */}
          <select
            name="role"
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="Frontend">Frontend Developer</option>
            <option value="Backend">Backend Developer</option>
            <option value="Full-Stack">Full-Stack Developer</option>
          </select>

          {/* Tech Stack */}
          <input
            name="techStack"
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.techStack.join(", ")}
            onChange={handleTechStackChange}
            placeholder="Tech Stack (e.g., React, Node.js)"
          />

          {/* Experience */}
          <input
            name="experience"
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.experience}
            type="number"
            min="0"
            onChange={handleChange}
            placeholder="Experience (Years)"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            className="p-2 w-full border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white h-24 resize-y text-sm focus:ring-indigo-500 focus:border-indigo-500"
            value={form.description}
            onChange={handleChange}
            placeholder="Description / Bio"
            required
          />
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="w-full bg-indigo-600 py-2 rounded-lg text-white font-semibold text-sm hover:bg-indigo-700 transition shadow-md"
            >
              Update
            </button>

            <button
              type="button"
              onClick={deleteHandler}
              className="w-full bg-red-600 py-2 rounded-lg text-white font-semibold text-sm hover:bg-red-700 transition shadow-md"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}