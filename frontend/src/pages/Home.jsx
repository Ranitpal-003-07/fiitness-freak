import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// Public Components
import Features from "./Features";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Main from "./Main";
import SignIn from "./SignIn";
import Register from "./Register";
import WorkoutDatabase from "./WorkoutDatabase";
import NutritionChecker from "./NutritionChecker";
import BmrCalculator from "./BmrCalculator";
import VerifyEmail from "./VerifyEmail";

// Private Components
import ProfileLayout from "./ProfileLayout";
import MealPlan from "./MealPlan";
import WaterIntake from "./WaterIntake";
import UpdateProfile from "./UpdateProfile";
import WorkoutDetails from "./WorkoutDetails";
import PrivateRoute from "./PrivateRoute";

// Context
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth(); // Access authentication status

  return (
    <div className="min-h-[90vh] relative">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Main />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/WorkoutDatabase" element={<WorkoutDatabase />} />
        <Route path="/NutritionChecker" element={<NutritionChecker />} />
        <Route path="/BmrCalculator" element={<BmrCalculator />} />

        {/* Auth Routes */}
        <Route
          path="/SignIn"
          element={isAuthenticated ? <Navigate to="/" replace /> : <SignIn />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Register />}
        />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* Private Routes */}
        <Route
          path="/profile/*"
          element={
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          }
        >
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path="workout-details" element={<WorkoutDetails />} />
          <Route path="meal-plan" element={<MealPlan />} />
          <Route path="water-intake" element={<WaterIntake />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default Home;
