import React from "react";
import MealCard from "./MealCard";
import { useMealsContext } from "./FetchMeals";

function MealList() {
  const { meals, isLoading, fetchError } = useMealsContext();
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="container">
      <h2>All Meals</h2>
      <div className="meal-list">
        {meals.map((meal) => (
          <div key={meal.id}>
            <MealCard meal={meal} key={meal.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default MealList;
