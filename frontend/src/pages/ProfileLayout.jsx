import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavLink from "../components/NavLink"; // Adjust the path based on your project structure
import '../Styles/Profile.css'


const ProfileLayout = () => {
  const [activeLink, setActiveLink] = useState("/profile/update-profile");

  return (
    <div className="profile-container">
      {/* Sidebar for Profile Navigation */}
      <aside className="profile-sidebar">
        <ul className="profile-nav-list">
          {/* Update Profile */}
          <NavLink
            to="/profile/update-profile"
            isActive={activeLink === "/profile/update-profile"}
            onClick={() => setActiveLink("/profile/update-profile")}
            className="profile-nav-item"
          >
            Update Profile
          </NavLink>

          <NavLink
            to="/profile/workout-details"
            isActive={activeLink === "/profile/workout-details"}
            onClick={() => setActiveLink("/profile/workout-details")}
            className="profile-nav-item"
          >
            Workout Details
          </NavLink>

          {/* Uncomment below links if needed */}
          {/* Meal Plan */}
          {/* <NavLink
            to="/profile/meal-plan"
            isActive={activeLink === "/profile/meal-plan"}
            onClick={() => setActiveLink("/profile/meal-plan")}
            className="profile-nav-item"
          >
            Meal Plan
          </NavLink> */}

          {/* Water Intake */}
          {/* <NavLink
            to="/profile/water-intake"
            isActive={activeLink === "/profile/water-intake"}
            onClick={() => setActiveLink("/profile/water-intake")}
            className="profile-nav-item"
          >
            Water Intake
          </NavLink> */}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="profile-main-content">
        <Outlet />
        {/* This renders child components like UpdateProfile, WorkoutDetails, etc. */}
      </main>
    </div>
  );
};

export default ProfileLayout;
