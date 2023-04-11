export const initialState = {
  isResLoading: true,
  fetchResError: null,
  reservedMeal: undefined,
};

export const MealDetailsReducer = (state, action) => {
  switch (action.type) {
    case "fetchData":
      return {
        ...state,
        isResLoading: true,
        fetchResError: null,
        reservedMeal: undefined,
      };
    case "success":
      return {
        ...state,
        isResLoading: false,
        reservedMeal: action.payload,
      };
    case "error":
      return {
        ...state,
        isResLoading: false,
        fetchResError: action.payload,
        reservedMeal: undefined,
      };
      case 'updateState': return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};
