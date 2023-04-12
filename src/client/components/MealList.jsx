import React, { useReducer, useEffect } from "react";
import MealCard from "./MealCard";
import { useMealsContext } from "./FetchMeals";
import { MealListReducer, initialState, handleFetch } from "./MealListReducer";
import { MealSearchBar } from "./MealSearchBar";
import DebounceText from "./DebounceText";

function MealList() {
  const { meals, isLoading, fetchError } = useMealsContext();
  const [state, dispatch] = useReducer(MealListReducer, initialState);
  const debouncedSearch = DebounceText(state.title, 1000);
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
  useEffect(() => {
    if (debouncedSearch) {
      handleFetch(state, dispatch);
    } else {
      dispatch({ type: "reset" });
    }
  }, [debouncedSearch, state.sortBy, state.sortDir]);

  return (
    <div className="container">
      <MealSearchBar
        state={state}
        handleChange={handleChange}
        handleSortDirection={handleSortDirection}
      />
      {(isLoading || state.loading) && <h1>loading...</h1>}
      {debouncedSearch && !state.loading && !isLoading && (
        <div>
          <h2>Searched Meals</h2>
          <div className="meal-list">
            {state.searchedMeals.map((meal) => (
              <div key={meal.id}>
                <MealCard meal={meal} key={meal.id} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!state.title && !state.loading && !isLoading && (
        <div>
          <h2>All Meals</h2>
          <div className="meal-list">
            {meals.map((meal) => (
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
