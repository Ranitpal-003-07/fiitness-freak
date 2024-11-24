import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Features from "./Features";
import AboutUs from "./AboutUs";
import Programs from "./Programs";
import Main from "./Main";
import SignIn from "./SignIn";
import Register from "./Register";
import WorkoutDatabase from "./WorkoutDatabase";
import NutritionChecker from "./NutritionChecker";
import BmrCalculator from "./BmrCalculator";
import VerifyEmail from "./VerifyEmail";
import ProfileLayout from "./ProfileLayout";
import MealPlan from "./MealPlan";
import WaterIntake from "./WaterIntake"; 
import { useAuth } from "../context/AuthContext";
import UpdateProfile from "./UpdateProfile";
import WorkoutDetails from "./WorkoutDetails";
const Home = () => {
  const { isAuthenticated } = useAuth(); // Get the authentication status

  return (
    <div className="min-h-[90vh] relative">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Programs" element={<Programs />} />
        <Route path="/WorkoutDatabase" element={<WorkoutDatabase />} />
        <Route path="/NutritionChecker" element={<NutritionChecker />} />
        <Route path="/BmrCalculator" element={<BmrCalculator />} />
        <Route path="/profile" element={<ProfileLayout />} />

        {/* Auth Routes */}
        <Route
          path="/SignIn"
          element={isAuthenticated ? <Navigate to="/" /> : <SignIn />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
};

export default Home;
