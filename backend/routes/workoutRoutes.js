const express = require("express");
const { addWorkout, getWorkouts, getWorkoutAnalytics } = require("../controllers/workoutController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get workout analytics with protection
router.get('/analytics', protect, async (req, res) => {
  try {
    await getWorkoutAnalytics(req, res); // Call the getWorkoutAnalytics controller
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout analytics", error: error.message });
  }
});

// Route to handle adding workouts and fetching workouts
router.route("/")
  .post(protect, async (req, res) => {
    try {
      await addWorkout(req, res); // Call the addWorkout controller
    } catch (error) {
      res.status(500).json({ message: "Error adding workout", error: error.message });
    }
  })
  .get(protect, async (req, res) => {
    try {
      await getWorkouts(req, res); // Call the getWorkouts controller
    } catch (error) {
      res.status(500).json({ message: "Error fetching workouts", error: error.message });
    }
  });

module.exports = router;
