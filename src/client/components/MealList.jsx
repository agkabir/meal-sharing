import React, { useReducer, useEffect } from "react";
import MealCard from "./MealCard";
import { useMealsContext } from "./FetchMeals";

import { MealSearchBar } from "./MealSearchBar";

function MealList() {
  const { state, dispatch } = useMealsContext();
  
  const handleChange = (e) => {
    dispatch({
      type: "changeInput",
      payload: { name: e.target.name, value: e.target.value },
    });
  };
  const handleSortDirection = () => {
    dispatch({
      type: "sortDir",
      payload: !state.sortDir,
    });
  };
  

  return (
    <div className="container">
      <MealSearchBar
        state={state}
        handleChange={handleChange}
        handleSortDirection={handleSortDirection}
      />
      {state.loading && <h1>loading...</h1>}
      {state.error && <h1>{state.error}</h1>}
      {state.title && state.searchedMeals && !state.loading && (
        <div>
          <div className="meal-list">
            {state.searchedMeals.map((meal) => (
              <div key={meal.id}>
                <MealCard meal={meal} key={meal.id} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!state.title && state.meals && !state.loading && (
        <div>
          <div className="meal-list">
            {state.meals.map((meal) => (
              <div key={meal.id}>
                <MealCard meal={meal} key={meal.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export default MealList;
