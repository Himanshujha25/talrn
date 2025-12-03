import { useState } from "react";
import DeveloperForm from "./pages/DeveloperForm";
import DeveloperList from "./pages/DeveloperList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Developer Directory
        </h1>

        <DeveloperForm onSuccess={() => setRefresh(!refresh)} />

        <div className="mt-6">
          <DeveloperList refresh={refresh} />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
