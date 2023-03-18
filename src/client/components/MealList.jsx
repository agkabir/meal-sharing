import React, { useState, useEffect } from "react";
import "./styles.css";
import MealCard from "./MealCard";

function MealList() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("api/meals");
      const data = await res.json();
      setMeals(data.data);
    })();
  }, []);
  return (
    <div className="meal-container">
      <h2>All Meals</h2>
      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.id}>
            <p></p>
            <MealCard meal={meal} key={meal.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default MealList;
