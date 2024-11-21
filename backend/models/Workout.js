const mongoose = require("mongoose");

// Define the Workout Schema
const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercise: {
      type: String,
      required: true,
    },
    sets: {
      type: Number,
      required: true,
      min: [1, "Sets should be at least 1"],
      max: [10, "Sets should not exceed 10"], // Optional upper limit for sets
    },
    repsPerSet: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === this.sets && v.every(rep => rep > 0); // Ensure reps are positive and match sets
        },
        message: "The number of reps per set must match the number of sets, and each rep count must be positive",
      },
    },
    muscleGroup: {
      type: String,
      required: true,
      enum: ["upper body", "lower body", "core", "full body", "legs", "arms", "back"], // Expanded muscle groups
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weightPerSet: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === this.sets && v.every(weight => weight > 0); // Ensure weights are positive and match sets
        },
        message: "The number of weights per set must match the number of sets, and each weight must be positive",
      },
    },
    notes: {
      type: String,
      default: "", // Optional field for extra notes
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Workout model from the schema
module.exports = mongoose.model("Workout", workoutSchema);
