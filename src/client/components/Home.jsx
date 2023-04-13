import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import MealCard from "./MealCard";
import { useMealsContext } from "./FetchMeals";

function Home() {
  const { state } = useMealsContext();
  if (state.loading) {
    return <h1>loading...</h1>;
  }
  if (state.error) {
    return <h1>{state.error}</h1>;
  }
  return (
    <div>
      <h1>Meal Sharing</h1>
      <div className="show-more-div">
        <h2>This page displays a portion of all meals</h2>
        <Link to="/meals">
          <button>See More</button>
        </Link>
      </div>
      <div className="meal-list">
        {state.meals.slice(0, 3).map((meal) => (
          <div key={meal.id}>
            <MealCard meal={meal} key={meal.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
