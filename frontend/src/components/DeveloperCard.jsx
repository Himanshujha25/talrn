import { Link } from "react-router-dom";

export default function DeveloperCard({ dev }) {
  return (
    <Link
      to={`/developer/${dev._id}`}
      className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:scale-[1.02] transition"
    >
      <h2 className="text-xl font-bold dark:text-white">{dev.name}</h2>
      <p className="text-gray-600 dark:text-gray-300">{dev.role}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {dev.techStack.join(", ")}
      </p>
      <p className="text-xs mt-1 text-gray-400">
        Experience: {dev.experience} yrs
      </p>
    </Link>
  );
}
