import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const API = "https://talrn-gl6q.onrender.com/api/developers";

export default function DeveloperProfile() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [dev, setDev] = useState(null);

  const fetchDev = async () => {
    const { data } = await axios.get(`${API}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDev(data);
  };

  useEffect(() => {
    fetchDev();
  }, []);

  if (!dev) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded 
                   hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Back
      </button>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow border dark:border-gray-700">


        {/* IMAGE SECTION */}
        {dev.photo && (
          <div className="w-full flex justify-center mb-6">
            <img
              src={`https://talrn-gl6q.onrender.com${dev.photo}`}
              alt={dev.name}
              className="w-40 h-40 rounded-full object-cover border shadow"
            />
          </div>
        )}


        <h1 className="text-3xl font-bold dark:text-white">{dev.name}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">{dev.role}</p>

        <p className="mt-3 text-gray-700 dark:text-gray-300">
          Experience: <span className="font-medium">{dev.experience} years</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {dev.techStack.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-sm text-blue-800 dark:text-blue-200 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        <p className="mt-6 text-gray-800 dark:text-gray-300 leading-relaxed">
          {dev.description}
        </p>

        <Link
          to={`/edit/${dev._id}`}
          className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded"
        >
          Edit Developer
        </Link>
      </div>
    </div>
  );
}
