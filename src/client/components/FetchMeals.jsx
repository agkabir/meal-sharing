import React, { createContext, useContext, useReducer, useEffect } from "react";
export const MealsContext = createContext();
import {
  FetchMealsReducer, initialState,
  handleFetch,
} from "./FetchMealsReducer";
import DebounceText from "./DebounceText";

export function MealsContextProvider({ children }) {
  const [state, dispatch] = useReducer(FetchMealsReducer, initialState);
  const debouncedSearch = DebounceText(state.title,1000)

  // fetch meals
  useEffect(() => {
      handleFetch(state, dispatch);
  }, [debouncedSearch, state.sortBy, state.sortDir]);

  const getMeal = (mealId) => {
    if (!state.meals) return undefined;
    return state.meals.find((aMeal)=> aMeal.id === Number(mealId))
  }
  const contextValue = { state, dispatch, getMeal };

  return (
    <div>
      <MealsContext.Provider value={contextValue}>
        {children}
      </MealsContext.Provider>
    </div>
  );
}

export function useMealsContext() {
  return useContext(MealsContext);
}
