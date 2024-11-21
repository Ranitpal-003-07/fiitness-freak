import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavLink from "../components/NavLink"; // Adjust the path based on your project structure

const ProfileLayout = () => {
  const [activeLink, setActiveLink] = useState("/profile/update-profile"); // Default active link

  return (
    <div className="flex flex-col md:flex-row mt-10 gap-6">
      {/* Sidebar for Profile Navigation */}
      <aside className="w-full md:w-72 bg-gray-100 border border-blue-500 rounded-lg shadow-md p-4">
        <ul className="flex flex-col gap-2">
          {/* Update Profile */}
          <NavLink
            to="/profile/update-profile"
            isActive={activeLink === "/profile/update-profile"}
            onClick={() => setActiveLink("/profile/update-profile")}
          >
            Update Profile
          </NavLink>
          <NavLink
            to="/profile/workout-details"
            isActive={activeLink === "/profile/workout-details"}
            onClick={() => setActiveLink("/profile/workout-details")}
          >
            Workout Details
          </NavLink>

          {/* Uncomment below links if needed */}
          {/* Meal Plan */}
          {/* <NavLink
            to="/profile/meal-plan"
            isActive={activeLink === "/profile/meal-plan"}
            onClick={() => setActiveLink("/profile/meal-plan")}
          >
            Meal Plan
          </NavLink> */}

          {/* Water Intake */}
          {/* <NavLink
            to="/profile/water-intake"
            isActive={activeLink === "/profile/water-intake"}
            onClick={() => setActiveLink("/profile/water-intake")}
          >
            Water Intake
          </NavLink> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow bg-white border border-gray-200 rounded-lg shadow-md p-6">
        <Outlet />
        {/* This renders child components like UpdateProfile, WorkoutDetails, etc. */}
      </main>
    </div>
  );
};

export default ProfileLayout;
