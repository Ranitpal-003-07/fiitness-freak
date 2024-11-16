import React, { useState } from "react";
import axios from "axios";
import "../Styles/workout.css"; // Import external CSS

const WorkoutDatabase = () => {
  const [isExercise, setIsExercise] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (event) => {
    setIsExercise(event.target.value); // Update selected body part
  };

  const handleSearch = async () => {
    if (!isExercise) return;

    setIsLoading(true);
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${isExercise}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
      },
    };

    try {
      const response = await axios.request(options);
      setExercises(response.data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <h1 className="title">Search For A Perfect Exercise</h1>
        <div className="search-bar">
          <select
            value={isExercise}
            onChange={handleSelectChange}
            className="dropdown"
          >
            <option value="">Select a Muscle Group</option>
            <option value="back">Back</option>
            <option value="cardio">Cardio</option>
            <option value="chest">Chest</option>
            <option value="lower%20arms">Lower Arms</option>
            <option value="lower%20legs">Lower Legs</option>
            <option value="neck">Neck</option>
            <option value="shoulders">Shoulders</option>
            <option value="upper%20arms">Upper Arms</option>
            <option value="upper%20legs">Upper Legs</option>
            <option value="waist">Waist</option>
          </select>
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>
        {isLoading ? (
          <p className="loading-text">Loading exercises...</p>
        ) : exercises.length === 0 ? (
          <p className="placeholder-text">
            Exercises and demonstrations will be displayed here.
          </p>
        ) : null}
      </div>
      <div className="exercise-list">
        {exercises &&
          exercises.map((exercise) => (
            <div key={exercise.id} className="exercise-card">
              <img
                src={exercise?.gifUrl}
                alt={exercise.name}
                className="exercise-image"
              />
              <h3 className="exercise-name">{exercise?.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkoutDatabase;
