import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for button
  const { login } = useAuth(); // Context hook to manage auth state
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      // Send login request
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      // Successful login
      toast.success("Sign in successful");
      login(response.data.token); // Update auth context with JWT token
      navigate("/"); // Redirect to homepage
    } catch (error) {
      // Handle login errors
      const errorMessage = error.response?.data?.message || "An error occurred";
      console.error("Error signing in:", errorMessage);
      toast.error(`Error signing in: ${errorMessage}`);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div
      className="flex flex-col xl:flex-row animate-fadeIn justify-center m-auto items-center xl:justify-normal bg-black w-full md:w-[80%] h-[60vh] sm:h-[80vh] bg-cover bg-center rounded-3xl"
      style={{ backgroundImage: `url('/loginbg1.jpg')` }} // Background image for the component
    >
      {/* Sign-in form container */}
      <div className="text-white md:h-[70%] h-full md:w-[50%] w-full flex bg-[rgba(0,0,0,0.25)] mx-8 rounded-[2.5rem] items-center justify-center flex-col gap-4 p-8">
        <h2 className="text-5xl xl:text-7xl font-semibold">Sign In</h2>

        {/* Form for user credentials */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-6 mt-8"
        >
          {/* Email input */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
          </div>

          {/* Password input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-white"
              />
            </button>
          </div>

          {/* Submit button */}
          <button
            className={`p-3 text-2xl bg-slate-900 py-3 border-white border hover:border-orange-400 md:w-[15vw] w-[30vw] mt-12 m-auto rounded-full ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            type="submit"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Signing In..." : "Sign In"} {/* Dynamic button text */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
