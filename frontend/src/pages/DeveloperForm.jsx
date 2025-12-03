import { useState } from "react";
import { toast } from "react-toastify";

export default function DeveloperForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Frontend");
  const [techStack, setTechStack] = useState("");
  const [experience, setExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !techStack) {
      toast.error("Name and Tech Stack are required!");
      return;
    }

    const payload = {
      name,
      role,
      techStack,
      experience
    };

    try {
      const res = await fetch("https://talrn-gl6q.onrender.com/developers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        toast.error("Error saving developer");
        return;
      }

      toast.success("Developer added successfully!");

      setName("");
      setTechStack("");
      setExperience("");

      onSuccess();

    } catch (error) {
      toast.error("Server Error: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-5 space-y-3"
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Developer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Frontend</option>
        <option>Backend</option>
        <option>Full-Stack</option>
      </select>

      <input
        className="w-full border p-2 rounded"
        placeholder="Tech Stack (comma separated)"
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Experience (years)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Developer
      </button>
    </form>
  );
}
