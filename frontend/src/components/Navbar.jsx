import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  SunIcon,
  MoonIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/solid";

export default function Navbar({ logout }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-5 py-4">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          Developer Directory
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700
                       border border-gray-300 dark:border-gray-700
                       text-gray-800 dark:text-gray-200 transition"
          >
            {theme === "light" ? (
              <>
                <MoonIcon className="w-5 h-5" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <SunIcon className="w-5 h-5 text-yellow-400" />
                <span>Light</span>
              </>
            )}
          </button>

          {/* Add Developer */}
          <Link
            to="/add"
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-blue-600 text-white hover:bg-blue-700 
                       transition shadow-sm"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Developer</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg 
                       bg-red-600 text-white hover:bg-red-700 
                       transition shadow-sm"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden px-5 pb-4 space-y-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700">

          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700
                       border border-gray-300 dark:border-gray-700
                       text-gray-800 dark:text-gray-200 transition"
          >
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            {theme === "light" ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>

          <Link
            to="/add"
            onClick={() => setOpen(false)}
            className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition shadow-sm"
          >
            Add Developer
          </Link>

          <button
            onClick={logout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg 
                       hover:bg-red-700 transition shadow-sm"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
