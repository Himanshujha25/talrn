import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";
import DeveloperCard from "../components/DeveloperCard";
import Loader from "../components/Loader";

const API = "https://talrn-gl6q.onrender.com/api/developers";

export default function Dashboard() {
  const token = localStorage.getItem("token");

  // State for fetched developers and total pages
  const [developers, setDevelopers] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Added for robust pagination
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState(""); // Debounced search query (for API)
  const [inputValue, setInputValue] = useState(""); // Search input value (for UI)
  const [role, setRole] = useState("");
  const [sort, setSort] = useState("");

  // pagination
  const [page, setPage] = useState(1);
  const limit = 6;

  // Debounce timeout ref
  const searchRef = useRef(null);

  // Use useCallback for fetchDevelopers to avoid unnecessary re-creation
  const fetchDevelopers = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search, role, sort, page, limit },
      });

      // Assuming the API returns an object like { developers: [...], totalPages: N }
      // ADJUST THIS based on your actual backend response structure.
      setDevelopers(data.developers || data); 
      setTotalPages(data.totalPages || 1); // Extract total pages from response
      setLoading(false);
    } catch (err) {
      console.error("Error fetching developers:", err);
      setDevelopers([]); // Clear developers on error
      setLoading(false);
    }
  }, [search, role, sort, page, token, limit]); // dependency on limit is optional

  useEffect(() => {
    // Only fetch if a filter/page changes (or on initial load)
    fetchDevelopers();
  }, [fetchDevelopers]);

  // FIX: Separate UI value from API query value and debounce
  const handleSearch = (value) => {
    setInputValue(value); // Update UI immediately

    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      setPage(1); // Reset page on new search
      setSearch(value); // Trigger API fetch after debounce time
    }, 300);
  };

  const handleRole = (value) => {
    setPage(1);
    setRole(value);
  };

  const handleSort = (value) => {
    setPage(1);
    setSort(value);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition">

      {/* FILTER BOX */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 mb-8 border 
                      border-gray-200 dark:border-gray-700 transition">

        <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">
          Filters
        </h2>

        <div className="flex flex-wrap gap-3">

          {/* Search - Using inputValue for display */}
          <input
            className="p-2 border rounded w-full sm:w-auto bg-gray-50 dark:bg-gray-700 
                        text-black dark:text-white border-gray-300 dark:border-gray-600
                        focus:ring-2 focus:ring-blue-500 outline-none transition"
            placeholder="Search name / tech"
            value={inputValue} // Bind to inputValue
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Role Filter */}
          <select
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700 
                        text-black dark:text-white border-gray-300 dark:border-gray-600
                        focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={role}
            onChange={(e) => handleRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Full-Stack</option>
          </select>

          {/* Sort */}
          <select
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700 
                        text-black dark:text-white border-gray-300 dark:border-gray-600
                        focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by Experience</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>

        </div>
      </div>

      {/* Developer Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developers.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            No developers found.
          </p>
        ) : (
          developers.map((dev) => <DeveloperCard key={dev._id} dev={dev} />)
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">
        
        {/* Display current page */}
        <span className="text-gray-600 dark:text-gray-400">
          Page {page} / {totalPages}
        </span>
        
        {/* Previous Button */}
        <button
          className="px-5 py-2 rounded-full border dark:border-gray-600
                      bg-white dark:bg-gray-800 text-black dark:text-white
                      hover:bg-gray-200 dark:hover:bg-gray-700 transition
                      disabled:opacity-40 disabled:cursor-not-allowed shadow"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ← Prev
        </button>

        {/* Next Button - Added logic to disable if on last page */}
        <button
          className="px-5 py-2 rounded-full border dark:border-gray-600
                      bg-white dark:bg-gray-800 text-black dark:text-white
                      hover:bg-gray-200 dark:hover:bg-gray-700 transition
                      disabled:opacity-40 disabled:cursor-not-allowed shadow"
          disabled={page >= totalPages} // FIX: Disable if current page is last page
          onClick={() => setPage((p) => p + 1)}
        >
          Next →
        </button>

      </div>
    </div>
  );
}