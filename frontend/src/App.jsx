import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddDeveloper from "./pages/AddDeveloper";
import EditDeveloper from "./pages/EditDeveloper";
import DeveloperProfile from "./pages/DeveloperProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Navbar from "./components/Navbar";

export default function App() {
  const { isAuthenticated, logout, login } = useContext(AuthContext);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {isAuthenticated && <Navbar logout={logout} />}

      <Routes>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login login={login} />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddDeveloper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditDeveloper />
            </ProtectedRoute>
          }
        />

        <Route
          path="/developer/:id"
          element={
            <ProtectedRoute>
              <DeveloperProfile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}
