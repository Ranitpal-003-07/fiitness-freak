const Workout = require("../models/Workout");

// Helper function to validate arrays (e.g., sets, repsPerSet, weightPerSet)
const validateArray = (array, type) => {
  if (!Array.isArray(array)) return false;
  return array.every(item => typeof item === type);
};

const addWorkout = async (req, res) => {
  const { exercise, sets, repsPerSet, weightPerSet, muscleGroup } = req.body;
  const userId = req.user.id;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to midnight for today's date comparison

  try {
    // Validation of incoming data
    if (!exercise || !sets || !repsPerSet || !weightPerSet || !muscleGroup) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate repsPerSet and weightPerSet as arrays of numbers
    if (!validateArray(repsPerSet, "number") || !validateArray(weightPerSet, "number")) {
      return res.status(400).json({ message: "Reps per set and weight per set must be arrays of numbers." });
    }

    // Check if there's an existing workout for the same exercise today
    const existingWorkout = await Workout.findOne({
      user: userId,
      exercise,
      date: { $gte: today },
    });

    if (existingWorkout) {
      // Update existing workout
      existingWorkout.sets += parseInt(sets);
      existingWorkout.repsPerSet.push(...repsPerSet.map(rep => parseInt(rep)));
      existingWorkout.weightPerSet.push(...weightPerSet.map(weight => parseFloat(weight)));
      const updatedWorkout = await existingWorkout.save();
      res.status(200).json(updatedWorkout);
    } else {
      // Create new workout
      const workout = new Workout({
        user: userId,
        exercise,
        sets: parseInt(sets),
        repsPerSet: repsPerSet.map(rep => parseInt(rep)),
        weightPerSet: weightPerSet.map(weight => parseFloat(weight)),
        muscleGroup,
        date: new Date(), // Record current date and time
      });
      const createdWorkout = await workout.save();
      res.status(201).json(createdWorkout);
    }
  } catch (error) {
    console.error('Error adding workout:', error);
    res.status(500).json({ message: "An error occurred while adding the workout." });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });

    // Formatting workouts to include totalReps
    const formattedWorkouts = workouts.map(workout => ({
      ...workout.toObject(),
      totalReps: workout.repsPerSet.reduce((sum, reps) => sum + reps, 0),
      totalWeight: workout.weightPerSet.reduce((sum, weight) => sum + weight, 0), // Added total weight calculation
    }));

    res.json(formattedWorkouts);
  } catch (error) {
    console.error("Error retrieving workouts:", error);
    res.status(500).json({ message: "An error occurred while fetching the workouts." });
  }
};

const getWorkoutAnalytics = async (req, res) => {
  const { exercise } = req.query;
  const userId = req.user.id;

  try {
    const workouts = await Workout.find({ user: userId, exercise }).sort({ date: 1 });
    
    // Mapping workout analytics with formatted date and detailed sets, reps, and weights
    const analytics = workouts.map(w => ({
      date: w.date.toISOString().split('T')[0], // Simplified date format
      sets: w.sets,
      repsPerSet: w.repsPerSet,
      weightPerSet: w.weightPerSet,
      totalReps: w.repsPerSet.reduce((sum, reps) => sum + reps, 0), // Added total reps calculation
      totalWeight: w.weightPerSet.reduce((sum, weight) => sum + weight, 0), // Added total weight calculation
    }));

    res.json(analytics);
  } catch (error) {
    console.error("Error retrieving workout analytics:", error);
    res.status(500).json({ message: "An error occurred while fetching the workout analytics." });
  }
};

module.exports = {
  addWorkout,
  getWorkouts,
  getWorkoutAnalytics,
};
