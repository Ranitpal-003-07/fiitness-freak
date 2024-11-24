import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import '../Styles/WorkoutDetails.css';




ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

const exerciseData = {
  Chest: ['Bench Press', 'Push-ups', 'Chest Flyes'],
  Back: ['Pull-ups', 'Rows', 'Deadlifts'],
  Legs: ['Squats', 'Lunges', 'Leg Press'],
  Shoulders: ['Shoulder Press', 'Lateral Raises', 'Front Raises'],
  Arms: ['Bicep Curls', 'Tricep Extensions', 'Hammer Curls'],
  Core: ['Planks', 'Crunches', 'Russian Twists'],
};

const WorkoutDetails = () => {
  const { user } = useAuth();
  const [workoutData, setWorkoutData] = useState({
    muscleGroup: '',
    exercise: '',
    sets: '',
    repsPerSet: [],
    weightPerSet: [],
  });
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [pastWorkouts, setPastWorkouts] = useState([]);
  const [analyticsExercise, setAnalyticsExercise] = useState('');
  const [allExercises, setAllExercises] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'sets' ? parseInt(value) || 0 : value;
  
    setWorkoutData((prev) => ({
      ...prev,
      [name]: parsedValue,
      ...(name === 'sets' && {
        repsPerSet: Array.from({ length: parsedValue }, () => ''),
        weightPerSet: Array.from({ length: parsedValue }, () => ''),
      }),
    }));
  };
  

  const handleMuscleGroupChange = (e) => {
    const { value } = e.target;
    setWorkoutData((prev) => ({
      ...prev,
      muscleGroup: value,
      exercise: '', 
    }));
    setFilteredExercises(value ? exerciseData[value] : []);
  };

  const handleExerciseChange = (e) => {
    const { value } = e.target;
    setWorkoutData((prev) => ({
      ...prev,
      exercise: value,
    }));
  };

  const handleRepsChange = (index, value) => {
    setWorkoutData((prev) => {
      const newReps = [...prev.repsPerSet];
      newReps[index] = parseInt(value) || 0;
      return { ...prev, repsPerSet: newReps };
    });
  };
  
  const handleWeightChange = (index, value) => {
    setWorkoutData((prev) => {
      const newWeights = [...prev.weightPerSet];
      newWeights[index] = parseFloat(value) || 0;
      return { ...prev, weightPerSet: newWeights };
    });
  };
  

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workoutData.muscleGroup || !workoutData.exercise || !workoutData.sets) {
      return alert('Please fill all required fields');
    }

    try {
      await axios.post(
        '/api/workouts',
        {
          ...workoutData,
          repsPerSet: workoutData.repsPerSet.map((rep) => parseInt(rep) || 0),
          weightPerSet: workoutData.weightPerSet.map((weight) => parseFloat(weight) || 0),
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` } }
      );
      alert('Workout added successfully');
      setWorkoutData({ muscleGroup: '', exercise: '', sets: '', repsPerSet: [], weightPerSet: [] });
      fetchPastWorkouts();
    } catch (error) {
      console.error('Error adding workout:', error.response?.data || error.message);
    }
  };

  const fetchPastWorkouts = async () => {
    try {
      const response = await axios.get('/api/workouts', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` },
      });
      setPastWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching past workouts:', error.response?.data || error.message);
    }
  };

  const fetchAnalytics = async () => {
    if (!analyticsExercise) return;
    try {
      const response = await axios.get(`/api/workouts/analytics?exercise=${analyticsExercise}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwttoken')}` },
      });
      setAnalyticsData(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPastWorkouts();
  }, []);

  useEffect(() => {
    const uniqueExercises = [...new Set(pastWorkouts.map((workout) => workout.exercise))].sort();
    setAllExercises(uniqueExercises);
  }, [pastWorkouts]);

  const prepareChartData = () => {
    return analyticsData
      ? {
          labels: analyticsData.map((item) => item.date),
          datasets: [
            {
              label: 'Sets',
              data: analyticsData.map((item) => item.sets),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
            {
              label: 'Avg Reps/Set',
              data: analyticsData.map((item) =>
                item.repsPerSet.reduce((sum, reps) => sum + reps, 0) / item.sets
              ),
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
            {
              label: 'Avg Weight/Set',
              data: analyticsData.map((item) =>
                item.weightPerSet.reduce((sum, weight) => sum + weight, 0) / item.sets
              ),
              borderColor: 'rgb(54, 162, 235)',
              tension: 0.1,
            },
          ],
        }
      : null;
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Workout Progress for ${analyticsExercise}` },
    },
  };

 

  return (
    <div class="workout-container">
    <h1 class="workout-title">Workout Details</h1>
    <form onSubmit={handleSubmit} className="workout-form">
  <div className="form-grid">
    <select
      name="muscleGroup"
      value={workoutData.muscleGroup}
      onChange={handleMuscleGroupChange}
      className="dropdown"
      required
    >
      <option value="">Select Muscle Group</option>
      {Object.keys(exerciseData).map((group) => (
        <option key={group} value={group}>
          {group}
        </option>
      ))}
    </select>
    <select
      name="exercise"
      value={workoutData.exercise}
      onChange={handleExerciseChange}
      className="dropdown"
      required
      disabled={!workoutData.muscleGroup}
    >
      <option value="">Select Exercise</option>
      {filteredExercises.map((exercise) => (
        <option key={exercise} value={exercise}>
          {exercise}
        </option>
      ))}
    </select>
    <input
      type="number"
      name="sets"
      value={workoutData.sets}
      onChange={handleInputChange}
      placeholder="Number of Sets"
      className="input-field"
      required
      min="1"
    />
  </div>
  {workoutData.sets && parseInt(workoutData.sets) > 0 && (
    <div className="sets-grid">
      {Array.from({ length: parseInt(workoutData.sets) }, (_, index) => (
        <React.Fragment key={index}>
          <input
            type="number"
            value={workoutData.repsPerSet[index] || ''}
            onChange={(e) => handleRepsChange(index, e.target.value)}
            placeholder={`Reps for Set ${index + 1}`}
            className="input-field"
            required
            min="1"
          />
          <input
            type="number"
            value={workoutData.weightPerSet[index] || ''}
            onChange={(e) => handleWeightChange(index, e.target.value)}
            placeholder={`Weight for Set ${index + 1}`}
            className="input-field"
            required
            min="0"
            step="0.1"
          />
        </React.Fragment>
      ))}
    </div>
  )}
  <button type="submit" className="submit-btn">
    Add Workout
  </button>
</form>

  
<div className="past-workouts">
  <h2 className="section-title">Past Workouts</h2>
  <div className="date-picker">
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => handleDateChange(e.target.value)}
      className="input-field"
    />
  </div>
  {selectedDate && (
    <div className="workout-list">
      {pastWorkouts
        .filter(
          (workout) =>
            new Date(workout.date).toDateString() ===
            new Date(selectedDate).toDateString()
        )
        .map((workout, index) => (
          <div key={index} className="workout-card">
            <div className="workout-card-content">
              <h3 className="workout-exercise">{workout.exercise}</h3>
              <p>
                <strong>Muscle Group:</strong> {workout.muscleGroup}
              </p>
              <p>
                <strong>Sets:</strong> {workout.sets}
              </p>
              <p>
                <strong>Reps per Set:</strong>
              </p>
              <ul className="list">
                {workout.repsPerSet.map((reps, idx) => (
                  <li key={idx}>
                    Set {idx + 1}: {reps} reps
                  </li>
                ))}
              </ul>
              <p>
                <strong>Weight per Set:</strong>
              </p>
              <ul className="list">
                {workout.weightPerSet.map((weight, idx) => (
                  <li key={idx}>
                    Set {idx + 1}: {weight} kg
                  </li>
                ))}
              </ul>
              <p>
                <strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
    </div>
  )}
  {selectedDate &&
    pastWorkouts.filter(
      (workout) =>
        new Date(workout.date).toDateString() ===
        new Date(selectedDate).toDateString()
    ).length === 0 && <p>No workouts found for the selected date.</p>}
</div>

  
  <div className="analytics-section">
    <h2 className="section-title">Workout Analytics</h2>
    <div className="analytics-form">
      <select
        value={analyticsExercise}
        onChange={(e) => setAnalyticsExercise(e.target.value)}
        className="dropdown"
      >
        <option value="">Select an exercise</option>
        {allExercises.map((exercise) => (
          <option key={exercise} value={exercise}>
            {exercise}
        </option>
        ))}
      </select>
      <button
        onClick={fetchAnalytics}
        className="analytics-btn"
        disabled={!analyticsExercise}
      >
        Show Analytics
      </button>
      </div>
      {analyticsData && (
      <div className="chart-container">
        <Line data={prepareChartData()} options={chartOptions} />
      </div>
      )}
    </div>

  </div>
  
  );
};

export default WorkoutDetails;
