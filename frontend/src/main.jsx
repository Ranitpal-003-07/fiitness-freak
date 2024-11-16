import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

console.log('API Key:', import.meta.env.VITE_RAPID_API_KEY);
console.log('API Host:', import.meta.env.VITE_RAPID_API_HOST);


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer/>
    </AuthProvider>
  </BrowserRouter>
);
