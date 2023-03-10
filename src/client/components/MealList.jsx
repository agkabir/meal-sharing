import React, { useState, useEffect } from "react";

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
    <div>
      <h2>All Meals</h2>
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>Title: {meal.title}</h3>
          <ul>
            <li>Description: {meal.description}</li>
            <li>Price: {meal.price}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
export default MealList;
