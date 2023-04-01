export const initialState = {
    loading: false,
    searchedMeals: [],
    error: false,
    title: "",
    sortBy:"when",
    sortDir: false
};

export const handleFetch = async(state, dispatchFunc) => {
  let URI = 'api/meals?'
  if (state.title) { URI = URI + "title=" + state.title+'&'; }
  if (state.sortBy) {
    URI = URI + "sortKey=" + state.sortBy + "&"; 
  }
  if (state.sortDir) {
    URI = URI + "sortDir=desc&";
  }
  try {
    dispatchFunc({ type: "fetchData" });
    const response = await fetch(URI);
    if (!response.ok) throw Error("Did not receive expected data!");
    const result = await response.json();
    dispatchFunc({ type: 'success', payload: result.data });
  } catch (err) {
    dispatchFunc({ type: 'error' });
  } 
};


export const MealListReducer = (state, action) => {
  switch (action.type) {
    case "fetchData":
      return {
        ...state,
        loading: true,
        error: false,
        searchedMeals: [],
      };
    case "success":
      return {
        ...state,
        loading: false,
        searchedMeals: action.payload,
      };
    case "error":
      return {
        loading: false,
        error: true,
        searchedMeals: [],
      };
    case "changeInput":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "sortDir":
      return {
        ...state,
        sortDir: action.payload,
      };
    case "reset":
      return initialState;
    default:
      return state;
  }
};
