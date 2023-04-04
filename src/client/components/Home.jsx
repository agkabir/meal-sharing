import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import MealCard from "./MealCard";
import { useMealsContext } from "./FetchMeals";

function Home() {
  const { meals, isLoading, fetchError } = useMealsContext();
  if (isLoading) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="meal-container">
      <h1>Meal Sharing</h1>
      <h2>This page displays a portion of all meals</h2>
      <div className="meal-list">
        {meals.slice(0, 2).map((meal) => (
          <div key={meal.id}>
            <MealCard meal={meal} key={meal.id} />
          </div>
        ))}
      </div>
      <br></br>
      <Link to='/meals'><button>See More</button></Link>
    </div>
  );
}
export default Home;
