import React, { createContext, useContext, useState, useEffect } from "react";
export const MealsContext = createContext();

export function MealsContextProvider({ children }) {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // fetch meals
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        //setIsLoading(true);
        const response = await fetch("api/meals");
        if (!response.ok) throw Error("Did not receive expected data!");
        const result = await response.json();
        setMeals(result.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeals();
  }, []);

  const getMeal = (mealId) => {
    if (!meals) return undefined;
    return meals.find((aMeal)=> aMeal.id === Number(mealId))
  }
  const contextValue = { meals, getMeal, isLoading, fetchError };

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
