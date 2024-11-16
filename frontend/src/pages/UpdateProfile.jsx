import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const UpdateProfile = () => {
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    height: "",
    weight: "",
    gender: "",
    age: "",
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        profileImage: null,
        height: user.height || "",
        weight: user.weight || "",
        gender: user.gender || "",
        age: user.age || "",
      });
      setPreviewImage(user.profileImage || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData({ ...formData, profileImage: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.put("/api/users/update-profile", formDataToSend, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      login(localStorage.getItem("jwttoken")); // Refresh user context
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMsg);
    }
  };

  const inputClasses =
    "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out";

  return (
    <motion.div
      className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">Update Your Profile</h2>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClasses}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${inputClasses} bg-gray-100`}
                value={formData.email}
                readOnly
              />
            </div>

            {/* Profile Image */}
            <div>
              <label htmlFor="profileImage" className="block text-lg font-medium text-gray-700 mb-1">
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border border-gray-300"
                  />
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  className={inputClasses}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Height */}
            <div>
              <label htmlFor="height" className="block text-lg font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                id="height"
                name="height"
                className={inputClasses}
                value={formData.height}
                onChange={handleChange}
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weight" className="block text-lg font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                className={inputClasses}
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className={inputClasses}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-lg font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                className={inputClasses}
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-1">
                New Password (Optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={inputClasses}
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={inputClasses}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-right">
            <motion.button
              type="submit"
              className="py-3 px-6 bg-indigo-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
              whileTap={{ scale: 0.95 }}
            >
              Update Profile
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;
