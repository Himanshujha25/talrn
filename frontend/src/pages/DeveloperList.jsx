import { useEffect, useState } from "react";

export default function DeveloperList({ refresh }) {
  const [developers, setDevelopers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [techFilter, setTechFilter] = useState("");

  const fetchDevelopers = async () => {
    const res = await fetch("https://talrn-gl6q.onrender.com/developers");
    const data = await res.json();
    setDevelopers(data);
  };

  useEffect(() => {
    fetchDevelopers();
  }, [refresh]);

  const filtered = developers.filter((dev) => {
    const matchRole = roleFilter
      ? dev.role.toLowerCase() === roleFilter.toLowerCase()
      : true;

    const matchTech = techFilter
      ? dev.techStack.join(" ").toLowerCase().includes(techFilter.toLowerCase())
      : true;

    return matchRole && matchTech;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Full-Stack</option>
        </select>

        <input
          className="border p-2 rounded flex-1"
          placeholder="Filter by tech"
          value={techFilter}
          onChange={(e) => setTechFilter(e.target.value)}
        />

        <button
          onClick={fetchDevelopers}
          className="border px-3 py-2 rounded"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((dev) => (
          <div key={dev._id} className="p-4 bg-white shadow rounded">
            <h3 className="font-semibold">{dev.name}</h3>
            <p className="text-sm text-gray-600">
              {dev.role} • {dev.experience} yrs
            </p>
            <p className="mt-2 text-xs text-gray-700">
              {dev.techStack.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
