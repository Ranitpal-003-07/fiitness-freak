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
    },
    repsPerSet: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === this.sets; // Ensure repsPerSet matches the number of sets
        },
        message: "The number of reps per set must match the number of sets",
      },
    },
    muscleGroup: {
      type: String,
      required: true,
      enum: ["upper body", "lower body", "core", "full body"], // Optional example muscle groups
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
          return v.length === this.sets; // Ensure weightPerSet matches the number of sets
        },
        message: "The number of weights per set must match the number of sets",
      },
    },
    notes: {
      type: String,
      default: "", // Optional field for any extra notes
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Workout model from the schema
module.exports = mongoose.model("Workout", workoutSchema);
