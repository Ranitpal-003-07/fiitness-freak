import React, { useState } from "react";
import axios from "axios";
import "../Styles/Nutrition.css"

const NutritionChecker = () => {
  const [isFoodItem, setIsFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleInputChange = (event) => {
    setIsFoodItem(event.target.value); // Update state with input value
  };

  const handleSearch = async () => {
    if (!isFoodItem.trim()) return; // Prevent search if input is empty
    setIsLoading(true); // Set loading to true
    setError(null); // Reset error state

    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(
          isFoodItem
        )}`,
        {
          headers: {
            "X-Api-Key": import.meta.env.VITE_NUTRITION_RAPID_API_KEY, // Use the correct API key from .env
          },
        }
      );

      const data = response.data;

      if (data.items.length > 0) {
        setNutritionResult(data.items[0]); // Set the first item from the result
      } else {
        setNutritionResult(null);
        setError("No nutrition information found for that food item.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      setError("Error fetching nutrition information. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="nutrition-checker-container">
      <div className="search-wrapper">
        <h1 className="search-header">Nutrition Information Search</h1>
        <div className="search-input-button-container">
          <input
            type="text"
            placeholder="Enter food item"
            value={isFoodItem}
            onChange={handleInputChange}
            className="search-input"
          />
          <button
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
        {/* Loading indicator */}
        {isLoading && <p className="loading-text">Loading nutrition information...</p>}
        {/* Error message */}
        {error && <p className="error-text">{error}</p>}
      </div>

      {/* Nutrition Table with Horizontal Scroll */}
      {nutritionResult && (
        <div className="table-container">
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Serving Size</th>
                <th>Calories</th>
                <th>Total Fat</th>
                <th>Saturated Fat</th>
                <th>Cholesterol</th>
                <th>Sodium</th>
                <th>Carbohydrates</th>
                <th>Fiber</th>
                <th>Sugar</th>
                <th>Protein</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{nutritionResult.name || "N/A"}</td>
                <td>100g</td>
                <td>{nutritionResult.calories || "N/A"}</td>
                <td>{`${nutritionResult.fat_total_g}g` || "N/A"}</td>
                <td>{`${nutritionResult.fat_saturated_g}g` || "N/A"}</td>
                <td>{`${nutritionResult.cholesterol_mg}mg` || "N/A"}</td>
                <td>{`${nutritionResult.sodium_mg}mg` || "N/A"}</td>
                <td>{`${nutritionResult.carbohydrates_total_g}g` || "N/A"}</td>
                <td>{`${nutritionResult.fiber_g}g` || "N/A"}</td>
                <td>{`${nutritionResult.sugar_g}g` || "N/A"}</td>
                <td>{`${nutritionResult.protein_g}g` || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NutritionChecker;
