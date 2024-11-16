import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true); // Start loading
    try {
      // Send user registration details
      const response = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });

      // Navigate to sign-in page after successful registration
      navigate("/SignIn");
      toast.success(
        "Registration successful! Check your email to verify your account."
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(/loginbg1.jpg)` }}
      className="flex flex-col xl:flex-row animate-fadeIn justify-center xl:justify-normal bg-black w-full md:w-[80%] h-[100vh] mb-6 sm:mb-auto sm:h-[80vh] bg-cover bg-center items-center m-auto mt-24 sm:mt-10 rounded-3xl"
    >
      <div className="text-white md:h-[90%] h-full md:w-[50%] w-full flex bg-[rgba(0,0,0,0.25)] mx-8 rounded-[2.5rem] items-center justify-center flex-col gap-4 sm:gap-4 p-8">
        <h2 className="text-5xl xl:text-7xl font-semibold">Register</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full justify-center items-center gap-6 mt-8"
        >
          {/* Name input */}
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
          </div>

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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} size="lg" />
            </button>
          </div>

          {/* Confirm Password input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              className="p-6 bg-slate-900 py-3 text-2xl border-white border md:w-[25vw] w-[60vw] hover:border-orange-400 rounded-full"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                size="lg"
              />
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`p-3 text-2xl bg-slate-900 py-3 border-white border hover:border-orange-400 md:w-[15vw] w-[30vw] mt-12 m-auto rounded-full ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
