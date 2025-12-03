import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { SunIcon, MoonIcon, PlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Navbar({ logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-lg">
      
      {/* Logo */}
      <h1 className="text-xl font-extrabold tracking-wide dark:text-white">
        Developer Directory
      </h1>

      <div className="flex items-center gap-5">

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer text-gray-700 dark:text-gray-200"
        >
          {theme === "light" ? (
            <>
              <MoonIcon className="w-5 h-5" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <SunIcon className="w-5 h-5 text-yellow-400" />
              <span>Light Mode</span>
            </>
          )}
        </button>

        {/* Add Developer Button */}
        <Link
          to="/add"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition cursor-pointer"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Developer</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg 
                     hover:bg-red-700 transition cursor-pointer"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>

      </div>
    </nav>
  );
}
