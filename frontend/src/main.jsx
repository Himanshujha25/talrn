import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right" autoClose={1800} />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);
