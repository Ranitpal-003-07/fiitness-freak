import React, { useState } from "react";
import '../Styles/BmrCal.css'; // Import the external CSS file

const BmrCalculator = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // default gender
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [calories, setCalories] = useState({
    deficit: "",
    maintenance: "",
    bulking: "",
    bmi: "", // Add BMI state
  });

  const calculateBMR = () => {
    const weightInKg = parseFloat(weight);
    const heightInCm = parseFloat(height);
    const ageInYears = parseInt(age, 10);

    if (isNaN(weightInKg) || isNaN(heightInCm) || isNaN(ageInYears)) {
      alert("Please enter valid numbers for age, weight, and height.");
      return;
    }

    let BMR = 0;
    // Harris-Benedict Equation for BMR
    if (gender === "male") {
      BMR =
        88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * ageInYears;
    } else {
      BMR =
        447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.33 * ageInYears;
    }

    // Calculating different calorie levels
    const maintenanceCalories = BMR * 1.2; // sedentary activity level
    const deficitCalories = maintenanceCalories - 500;
    const bulkingCalories = maintenanceCalories + 500;

    // Calculate BMI
    const heightInM = heightInCm / 100; // Convert height from cm to meters
    const bmi = weightInKg / (heightInM * heightInM);
    
    setCalories({
      deficit: Math.round(deficitCalories),
      maintenance: Math.round(maintenanceCalories),
      bulking: Math.round(bulkingCalories),
      bmi: bmi.toFixed(2), // Set the calculated BMI with 2 decimal places
    });
  };

  return (
    <div className="bmr-calculator">
      <div className="bmr-calculator-container">
        <h1 className="bmr-title">BMR Calculator</h1>
        <div className="bmr-form">
          <div>
            <label className="bmr-label">Age:</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="bmr-input"
            />
          </div>

          <div>
            <label className="bmr-label">Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bmr-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="bmr-label">Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="bmr-input"
            />
          </div>

          <div>
            <label className="bmr-label">Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="bmr-input"
            />
          </div>

          <button
            onClick={calculateBMR}
            className="bmr-button"
          >
            Calculate Calories
          </button>

          <table className="bmr-table">
            <thead>
              <tr>
                <th className="bmr-table-header">Calorie Type</th>
                <th className="bmr-table-header">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bmr-table-cell">Deficit</td>
                <td className="bmr-table-cell">{calories.deficit}</td>
              </tr>
              <tr>
                <td className="bmr-table-cell">Maintenance</td>
                <td className="bmr-table-cell">{calories.maintenance}</td>
              </tr>
              <tr>
                <td className="bmr-table-cell">Bulking</td>
                <td className="bmr-table-cell">{calories.bulking}</td>
              </tr>
              <tr>
                <td className="bmr-table-cell">BMI</td>
                <td className="bmr-table-cell">{calories.bmi}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BmrCalculator;
